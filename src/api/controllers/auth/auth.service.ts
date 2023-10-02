import { JwtPayload } from "jsonwebtoken";
import { AuthRepository } from "./auth.repository";
import { User } from "@entities/index";

const createUserAndGenerateToken = async (req: User) => {
  const user = await AuthRepository.insertUser(req);
  const payload: JwtPayload = {
    sub: user.id,
  };

  const token = await AuthRepository.generateTokenRespone(payload);

  return {
    user: user,
    token: token,
  };
};

const verifyUserAndGenerateToken = async (req: User) => {
  const user = await AuthRepository.verifyUser(req);
  const payload: JwtPayload = {
    sub: user?.id,
  };

  const token = await AuthRepository.generateTokenRespone(payload);

  return {
    user: user,
    token: token,
  };
};

const refreshToken = async (token: string | undefined) => {
  const refreshToken = token?.split(" ", 2)[1];
  const user = await AuthRepository.verifyRefreshToken(refreshToken!);
  const payload: JwtPayload = {
    sub: user.id,
  };
  const newToken = AuthRepository.generateTokenRespone(payload);

  return {
    user: user,
    token: newToken,
  };
};

const deleteToken = async () => {};

export default {
  createUserAndGenerateToken,
  verifyUserAndGenerateToken,
  refreshToken,
  deleteToken,
};
