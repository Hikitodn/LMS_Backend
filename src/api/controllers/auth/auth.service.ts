import { AuthRepository } from "./auth.repository";
import { UserDTO } from "./user.dto";

const create = async (user: UserDTO) => {
  const result = AuthRepository.insert(user);
  return result;
};

export default { create };
