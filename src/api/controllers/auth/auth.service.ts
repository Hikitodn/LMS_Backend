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

  const jwtToken = await AuthRepository.generateToken(payload);
  return {
    success: true,
    token: jwtToken.token,
    expiresIn: env.jwtExpirationMinutes,
  };
};

const verifyUserAndGenerateToken = async (req: User) => {
  const user = await AuthRepository.verifyUser(req);
  const payload = {
    exp: moment().add(env.jwtExpirationMinutes, "minutes").unix(),
    sub: user?.id,
  };

  const jwtToken = await AuthRepository.generateToken(payload);
  return {
    success: true,
    token: jwtToken.token,
    expiresIn: env.jwtExpirationMinutes,
  };
};

export default { createUserAndGenerateToken, verifyUserAndGenerateToken };
