import { Profile, User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";
import bcrypt from "bcryptjs";
import env from "src/config/env";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
import moment from "moment";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { pick } from "lodash";
import { redisClient } from "src/config/redis";

export const AuthRepository = PostgresDataSource.getRepository(User).extend({
  async insertUser(body: User) {
    const existedUser = await AuthRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (existedUser)
      throw new ApiError({
        message: "Email already registered",
        status: httpStatus.CONFLICT,
      });

    const profile = new Profile();
    profile.date_of_birth = body.profile.date_of_birth;
    profile.gender = body.profile.gender;

    const user = new User();
    user.email = body.email;
    user.password = body.password;
    user.name = body.name;
    user.role = body.role;
    user.profile = profile;
    await AuthRepository.insert(user);
    return pick(user, [
      "id",
      "name",
      "is_verified",
      "role",
      "profile.photo_path",
    ]);
  },

  async verifyUser(req: User) {
    const user = await AuthRepository.findOne({
      relations: { profile: true },
      where: {
        email: req.email,
      },
    });

    const err = {
      message: "Can't find user with this email",
      status: httpStatus.NOT_FOUND,
    };

    if (user) {
      if (user.password) {
        // return user and jwt
        if (user && (await bcrypt.compare(req.password, user.password))) {
          return pick(user, [
            "id",
            "name",
            "is_verified",
            "role",
            "profile.photo_path",
          ]);
        }
        err.message = "Incorrect email or password";
      }
    }

    throw new ApiError(err);
  },

  async verifyRefreshToken(refreshToken: string): Promise<Partial<User>> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        refreshToken,
        env.jwtRefreshToken as string,
        async (err, payload) => {
          if (err) reject(err);

          const user = await AuthRepository.findOneOrFail({
            where: {
              id: payload?.sub?.toString(),
            },
          });

          const redisRefreshToken = await redisClient.GET(user.id);
          if (!redisRefreshToken)
            throw new ApiError({
              message: "Invalid token",
              status: httpStatus.UNAUTHORIZED,
            });

          if (refreshToken === redisRefreshToken)
            resolve(
              pick(user, [
                "id",
                "name",
                "is_verified",
                "role",
                "profile.photo_path",
              ])
            );
        }
      );
    });
  },

  async generateTokenRespone(userId: string) {
    const payload: JwtPayload = {
      sub: userId,
    };

    const tokenType = "Bearer";
    const accessToken = await this.accessToken(payload);
    const refreshToken = await this.refreshToken(payload);
    const expiresIn = moment().add(env.jwtExpirationMinutes, "minutes");

    await redisClient.set(userId, refreshToken, {
      EX: 30 * 24 * 60 * 60,
    });

    return {
      tokenType,
      accessToken,
      refreshToken,
      expiresIn,
    };
  },

  accessToken(payload: JwtPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      Jwt.sign(
        payload,
        env.jwtAccessToken as string,
        {
          expiresIn: 60 * Number(env.jwtExpirationMinutes),
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token!);
        }
      );
    });
  },

  refreshToken(payload: JwtPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      Jwt.sign(
        payload,
        env.jwtRefreshToken as string,
        {
          expiresIn: "30d",
        },
        async (err, token) => {
          if (err) reject(err);
          resolve(token!);
        }
      );
    });
  },

  deleteToken() {},
});
