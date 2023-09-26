import { Profile, User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";
import bcrypt from "bcryptjs";
import env from "src/config/env";
import Jwt from "jsonwebtoken";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";

export const AuthRepository = PostgresDataSource.getRepository(User).extend({
  async insertUser(req: User) {
    const existedUser = await AuthRepository.findOne({
      where: {
        email: req.email,
      },
    });
    if (existedUser)
      throw new ApiError({
        message: "Email already registered",
        status: httpStatus.UNPROCESSABLE_ENTITY,
      });

    const profile = new Profile();
    profile.date_of_birth = req.profile.date_of_birth;
    profile.gender = req.profile.gender;

    const user = new User();
    user.email = req.email;
    user.password = req.password;
    user.name = req.name;
    user.profile = profile;
    const result = await AuthRepository.save(user);
    return {
      id: result.id,
    };
  },

  async verifyUser(req: User) {
    const user = await AuthRepository.findOneOrFail({
      where: {
        email: req.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    const err = new ApiError({
      message: "",
      status: httpStatus.UNAUTHORIZED,
    });

    if (user.password) {
      // return user and jwt
      if (user && (await bcrypt.compare(req.password, user.password))) {
        return { id: user.id };
      }
      err.message = "Incorrect email or password";
    }

    throw new ApiError(err);
  },

  async generateAccessToken(payload: string | object | Buffer) {
    const token = Jwt.sign(payload, env.jwtAccessToken as string);
    return { token: "Bearer " + token };
  },

  async generateRefreshToken() {},
});
