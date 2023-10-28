import { Classroom } from "@entities/index";
import { ClassroomRepository } from "./classroom.repository";
import { IUser } from "@utils/instance";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
// import { ApiError } from "@errors/api-error";

const createClassroom = async (user: IUser, body: Classroom) => {
  const existedClassroom = await ClassroomRepository.findOne({
    where: { name: body.name, user: { id: user.id } },
  });

  if (existedClassroom)
    return new ApiError({
      message: `Existed classroom name ${existedClassroom.name}`,
      status: httpStatus.BAD_REQUEST,
    });

  const newClassroom = new Classroom();
  newClassroom.name = body.name;
  newClassroom.description = body.description;
  newClassroom.isPublic = body.isPublic;

  const result = await ClassroomRepository.insert(newClassroom);
  return result;
};

const getClassroom = async ({ page = 1, perPage = 20 }) => {
  const result = await ClassroomRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    cache: true,
  });

  return result;
};

const getClassroomById = async (id: string) => {
  const result = await ClassroomRepository.findOneOrFail({
    where: {
      id: id,
    },
  });

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
  getClassroom,
  getClassroomById,
  patchClassroom,
  deleteClassroom,
};
