import { AuthRepository } from "./auth.repository";
import { User } from "@entities/index";

const createUserAndGenerateToken = async (user: User) => {
  const result = await AuthRepository.insert(user);
  return result;
};

export default { createUserAndGenerateToken };
