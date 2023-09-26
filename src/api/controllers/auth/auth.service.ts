import moment from "moment";
import { AuthRepository } from "./auth.repository";
import { User } from "@entities/index";
import env from "src/config/env";

const createUserAndGenerateToken = async (req: User) => {
  const user = await AuthRepository.insertUser(req);
  const payload = {
    exp: moment().add(env.jwtExpirationMinutes, "minutes").unix(),
    sub: user?.id,
  };

  const accessToken = await AuthRepository.generateAccessToken(payload);
  const refreshToken = "a";
  return {
    success: true,
    accessToken: accessToken.token,
    refreshToken: refreshToken,
    expiresIn: env.jwtExpirationMinutes + "m",
  };
};

const verifyUserAndGenerateToken = async (req: User) => {
  const user = await AuthRepository.verifyUser(req);
  const payload = {
    exp: moment().add(env.jwtExpirationMinutes, "minutes").unix(),
    sub: user?.id,
  };

  const accessToken = await AuthRepository.generateAccessToken(payload);
  const refreshToken = "a";

  return {
    success: true,
    accessToken: accessToken.token,
    refreshToken: refreshToken,
    expiresIn: env.jwtExpirationMinutes + "m",
  };
};

export default { createUserAndGenerateToken, verifyUserAndGenerateToken };
