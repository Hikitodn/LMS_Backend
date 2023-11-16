import { AuthRepository } from "./auth.repository";
import { User } from "@entities/index";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
import { pick } from "lodash";
import { redisClient } from "src/config/redis";

const createUserAndGenerateToken = async (body: User) => {
  const user = await AuthRepository.insertUser(body);
  const token = await AuthRepository.generateTokenRespone(user.id!);

  return {
    user: user,
    token: token,
  };
};

const verifyUserAndGenerateToken = async (body: User) => {
  const user = await AuthRepository.verifyUser(body);
  const token = await AuthRepository.generateTokenRespone(user.id!);

  return {
    user: user,
    token: token,
  };
};

const refreshToken = async (token: string | undefined) => {
  if (!token)
    throw new ApiError({
      message: "No token found",
      status: httpStatus.BAD_REQUEST,
    });

  const refreshToken = token.split(" ", 2)[1];
  const user = await AuthRepository.verifyRefreshToken(refreshToken);
  const newToken = await AuthRepository.generateTokenRespone(user.id!);

  return {
    user: user,
    token: newToken,
  };
};

const deleteRefreshToken = async (token: string | undefined) => {
  if (!token)
    throw new ApiError({
      message: "No token found",
      status: httpStatus.BAD_REQUEST,
    });
  const refreshToken = token.split(" ", 2)[1];
  const user = await AuthRepository.verifyRefreshToken(refreshToken);
  await redisClient.DEL(user.id!);
};

const getProfile = async (userId: string) => {
  const user = await AuthRepository.findOne({ where: { id: userId } });
  return pick(user, [
    "id",
    "name",
    "is_verified",
    "role",
    "profile.photo_path",
  ]);
};

const updateProfile = async (userId: string, body: User) => {
  const result = await AuthRepository.update(userId, body);
  return result;
};

export default {
  createUserAndGenerateToken,
  verifyUserAndGenerateToken,
  refreshToken,
  deleteRefreshToken,
  getProfile,
  updateProfile,
};
