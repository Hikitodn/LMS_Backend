import { Classroom, User } from "@entities/index";
import { ClassroomRepository } from "./classroom.repository";
import { KeyValueType, SearchCustomOptions } from "@utils/instance";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";

const createClassroom = async (
  params: KeyValueType<string>,
  body: Classroom
) => {
  const existedClassroom = await ClassroomRepository.findOne({
    where: { name: body.name, user: { id: params.userId } },
  });

  if (existedClassroom)
    throw new ApiError({
      message: `Existed classroom name ${existedClassroom.name}`,
      status: httpStatus.BAD_REQUEST,
    });

  const userId = new User();
  userId.id = params.userId;

  const newClassroom = new Classroom();
  newClassroom.name = body.name;
  newClassroom.description = body.description;
  newClassroom.isPublic = body.isPublic;
  newClassroom.user = userId;

  await ClassroomRepository.insert(newClassroom);
  return newClassroom;
};

const getAllClassrooms = async (
  params: KeyValueType<string>,
  { column, type = "asc", page = 1, perPage = 20 }: SearchCustomOptions
) => {
  const result = await ClassroomRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    cache: true,
    where: { user: { id: params.userId } },
    order: {
      [`${column === "name" ? "name" : "created_at"}`]: type,
    },
  });

  return result;
};

const getOneClassroom = async (params: KeyValueType<string>) => {
  const result = await ClassroomRepository.findOneOrFail({
    where: {
      id: params.classroomId,
      user: { id: params.userId },
    },
  });

  // if(result.isPublic === false && )

  return result;
};

const updateClassroom = async (
  params: KeyValueType<string>,
  body: Classroom
) => {
  const result = await ClassroomRepository.update(params.classroomId, body);
  return result;
};

const deleteClassroom = async (params: KeyValueType<string>) => {
  const result = await ClassroomRepository.delete(params.classroomId);
  return result;
};

export default {
  createClassroom,
  getAllClassrooms,
  getOneClassroom,
  updateClassroom,
  deleteClassroom,
};
