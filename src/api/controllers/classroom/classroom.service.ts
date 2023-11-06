import { Classroom, User } from "@entities/index";
import { ClassroomRepository } from "./classroom.repository";
import { IUser, SearchCustomOptions } from "@utils/instance";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";

const createClassroom = async (user: IUser, body: Classroom) => {
  const existedClassroom = await ClassroomRepository.findOne({
    where: { name: body.name, user: { id: user.id } },
  });

  if (existedClassroom)
    throw new ApiError({
      message: `Existed classroom name ${existedClassroom.name}`,
      status: httpStatus.BAD_REQUEST,
    });

  const userId = new User();
  userId.id = user.id;

  const newClassroom = new Classroom();
  newClassroom.name = body.name;
  newClassroom.description = body.description;
  newClassroom.isPublic = body.isPublic;
  newClassroom.user = userId;

  const result = await ClassroomRepository.save(newClassroom);
  return result;
};

const getClassrooms = async (
  userId: string,
  { column, type = "asc", page = 1, perPage = 20 }: SearchCustomOptions
) => {
  const result = await ClassroomRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    cache: true,
    where: { user: { id: userId } },
    order: {
      [`${column === "name" ? "name" : "created_at"}`]: type,
    },
  });
  return result;
};

const getClassroomById = async (id: string) => {
  const result = await ClassroomRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

  // if(result.isPublic === false && )

  return result;
};

const patchClassroom = async (id: string, body: Classroom) => {
  const result = await ClassroomRepository.update(id, body);
  return result;
};

const deleteClassroom = async (id: string) => {
  const result = await ClassroomRepository.delete(id);
  return result;
};

export default {
  createClassroom,
  getClassrooms,
  getClassroomById,
  patchClassroom,
  deleteClassroom,
};
