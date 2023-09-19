import { User } from "@entities/index";
import { UserRepository } from "./user.repository";
// import { ApiError } from "@errors/api-error";
// import httpStatus from "http-status";
// import { omitBy } from "lodash";

const create = async (user: User) => {
  const newUser = new User();

  newUser.email = user.email;
  newUser.password = user.password;
  newUser.name = user.name;

  // const existedUser = await UserRepository.findOne({
  //   where: { email: newUser.email },
  // });

  // if (existedUser?.email) {
  //   throw new ApiError({
  //     status: httpStatus.UNPROCESSABLE_ENTITY,
  //     message: "Duplicated Email",
  //     errors: "Api Error",
  //     isPublic: false,
  //   });
  // }

  const result = await UserRepository.insert(newUser);
  return result;
};

const getAll = async ({ page = 1, perPage = 20 }) => {
  const fields = {
    id: true,
    email: true,
    name: true,
    role: true,
    is_verified: true,
    created_at: true,
  };

  const result = await UserRepository.find({
    take: perPage,
    select: fields,
    skip: perPage * (page - 1),
    cache: true,
  });

  return result;
};

const getById = async (id: string) => {
  const fields = {
    id: true,
    email: true,
    name: true,
    role: true,
    is_verified: true,
    created_at: true,
  };

  const result = await UserRepository.findOne({
    where: { id: id },
    select: fields,
  });

  return result;
};

const updateById = async () => {
  const result = UserRepository;
  return result;
};

const deleteById = async () => {
  const result = UserRepository;
  return result;
};

// const create = async (user: User) => {
//   const newUser = new User();
//   newUser.email = user.email;
//   newUser.password = user.password;
//   newUser.name = user.name;
//   const result = await UserRepository.insert(newUser);
//   return result;
// };

// const create = async (user: User) => {
//   const newUser = new User();
//   newUser.email = user.email;
//   newUser.password = user.password;
//   newUser.name = user.name;
//   const result = await UserRepository.insert(newUser);
//   return result;
// };

// const create = async (user: User) => {
//   const newUser = new User();
//   newUser.email = user.email;
//   newUser.password = user.password;
//   newUser.name = user.name;
//   const result = await UserRepository.insert(newUser);
//   return result;
// };

export default { create, getAll, getById, updateById, deleteById };
