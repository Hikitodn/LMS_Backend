import { Profile, User } from "@entities/index";
import { ProfileRepository, UserRepository } from "./user.repository";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
import { omit } from "lodash";
import { KeyValueType, SearchCustomOptions } from "@utils/instance";

const create = async (body: User) => {
  const existedUser = await UserRepository.findOne({
    where: { email: body.email },
  });

  if (existedUser) {
    throw new ApiError({
      message: "Email already registered",
      status: httpStatus.CONFLICT,
    });
  }

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

  return omit(user, [
    "password",
    "created_at",
    "profile.id",
    "profile.updated_at",
  ]);
};

const getAllUser = async ({
  column = "created_at",
  type = "ASC",
  page = 1,
  perPage = 20,
}: SearchCustomOptions) => {
  const result = await UserRepository.find({
    take: perPage,
    select: {
      email: true,
      name: true,
      role: true,
      is_verified: true,
      created_at: true,
    },
    skip: perPage * (page - 1),
    cache: true,
    order: {
      [`${column}`]: type,
    },
  });

  return result;
};

const getOneUser = async (params: KeyValueType<string>) => {
  const result = await UserRepository.findOne({
    where: { id: params.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      is_verified: true,
      created_at: true,
      profile: {
        date_of_birth: true,
      },
    },
    relations: { profile: true },
  });

  return result;
};

const updateUser = async (params: KeyValueType<string>, user: User) => {
  const result = await UserRepository.update(params.id, user);
  return result;
};

const deleteUser = async (params: KeyValueType<string>) => {
  const result = await UserRepository.delete(params.id);
  return result;
};

export default { create, getAllUser, getOneUser, updateUser, deleteUser };
