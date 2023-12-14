import { UserRepository } from "./auth.repository";
import { User } from "@entities/index";
import { omit, pick } from "lodash";
import { redisClient } from "src/config/redis";

const createUserAndGenerateToken = async (body: User) => {
  const user = await UserRepository.insertUser(body);
  const token = await UserRepository.generateTokenRespone(user.id);

  return {
    user: omit(user, [
      "password",
      "created_at",
      "profile.id",
      "profile.updated_at",
    ]),
    token: token,
  };
};

const verifyUserAndGenerateToken = async (body: User) => {
  const user = await UserRepository.verifyUser(body);
  const token = await UserRepository.generateTokenRespone(user.id);

  return {
    user: pick(user, [
      "id",
      "name",
      "is_verified",
      "role",
      "profile.photo_path",
    ]),
    token: token,
  };
};

const refreshToken = async (token: string | undefined) => {
  const refreshToken = UserRepository.getRefreshToken(token);
  const user = await UserRepository.verifyRefreshToken(refreshToken);
  const newAccessToken = await UserRepository.generateAccessToken(user.id);
  const expiresIn = UserRepository.generateExpireTime();

  return {
    token: {
      tokenType: "Bearer",
      accessToken: newAccessToken,
      expiresIn: expiresIn,
    },
  };
};

const deleteRefreshToken = async (token: string | undefined) => {
  const refreshToken = UserRepository.getRefreshToken(token);
  const user = await UserRepository.verifyRefreshToken(refreshToken);
  await redisClient.DEL(user.id);
};

export default {
  createUserAndGenerateToken,
  verifyUserAndGenerateToken,
  refreshToken,
  deleteRefreshToken,
};
