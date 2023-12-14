import { Profile, User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";
import bcrypt from "bcryptjs";
import env from "src/config/env";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
import moment from "moment";
import Jwt from "jsonwebtoken";
import { redisClient } from "src/config/redis";

export const UserRepository = PostgresDataSource.getRepository(User).extend({
  async insertUser(body: User) {
    const existedUser = await UserRepository.findOne({
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
    profile.photos = body.profile.photos;
    profile.date_of_birth = body.profile.date_of_birth;
    profile.gender = body.profile.gender;
    await ProfileRepository.insert(profile);

    const user = new User();
    user.email = body.email;
    user.password = body.password;
    user.name = body.name;
    user.role = body.role;
    user.profile = profile;
    await UserRepository.insert(user);

    return user;
  },

  async verifyUser(body: User) {
    const user = await UserRepository.findOne({
      relations: { profile: true },
      where: {
        email: body.email,
      },
    });

    const err = {
      message: "Can't find user with this email",
      status: httpStatus.NOT_FOUND,
    };

    if (user) {
      if (user.password) {
        if (user && (await bcrypt.compare(body.password, user.password))) {
          return user;
        }
        err.message = "Incorrect email or password";
      }
    }

    throw new ApiError(err);
  },

  async verifyRefreshToken(refreshToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        refreshToken,
        env.jwtRefreshToken as string,
        async (err, payload) => {
          if (err) reject(err);

          const user = await UserRepository.findOneOrFail({
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

          if (refreshToken === redisRefreshToken) resolve(user);
        }
      );
    });
  },

  async generateTokenRespone(userId: string) {
    const tokenType = "Bearer";
    const accessToken = await this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);
    const expiresIn = this.generateExpireTime();

    return {
      tokenType,
      accessToken,
      refreshToken,
      expiresIn,
    };
  },

  generateAccessToken(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Jwt.sign(
        { sub: userId },
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

  generateRefreshToken(userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Jwt.sign(
        { sub: userId },
        env.jwtRefreshToken as string,
        {
          expiresIn: "30d",
        },
        async (err, token) => {
          if (err) reject(err);
          if (token) {
            await redisClient.set(userId, token, {
              EX: 30 * 24 * 60 * 60,
            });
            resolve(token!);
          }
        }
      );
    });
  },

  generateExpireTime() {
    return moment().add(env.jwtExpirationMinutes, "minutes");
  },

  getRefreshToken(token: string | undefined) {
    if (!token) {
      throw new ApiError({
        message: "No token found",
        status: httpStatus.UNAUTHORIZED,
      });
    }

    const refreshToken = token.split(" ", 2)[1];
    return refreshToken;
  },
});

export const ProfileRepository = PostgresDataSource.getRepository(Profile);
