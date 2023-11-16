import { Assignment, Classroom } from "@entities/index";
import { AssignmentRepository } from "./assignment.repository";
import { KeyValueType, SearchCustomOptions } from "@utils/instance";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";

const createAssignment = async (
  params: KeyValueType<string>,
  body: Assignment
) => {
  const existedAssignment = await AssignmentRepository.findOne({
    where: {
      name: body.name,
      classroom: { id: params.classroomId },
    },
  });

  if (existedAssignment)
    throw new ApiError({
      message: `Existed assignment name ${existedAssignment.name}`,
      status: httpStatus.BAD_REQUEST,
    });

  const classroomId = new Classroom();
  classroomId.id = params.classroomid;

  const newAssignment = new Assignment();
  newAssignment.name = body.name;
  newAssignment.description = body.description;
  newAssignment.classroom = classroomId;

  await AssignmentRepository.insert(newAssignment);
  return newAssignment;
};

const getAllAssignment = async (
  params: KeyValueType<string>,
  { column, type = "asc", page = 1, perPage = 20 }: SearchCustomOptions
) => {
  const result = await AssignmentRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    cache: true,
    where: { classroom: { id: params.classroomId } },
    order: {
      [`${column === "name" ? "name" : "created_at"}`]: type,
    },
  });

  return result;
};

const getOneAssignment = async (params: KeyValueType<string>) => {
  const result = await AssignmentRepository.findOneOrFail({
    where: { id: params.assignmentId, classroom: { id: params.classroomId } },
  });

  // if(result.isPublic === false && )

  return result;
};

const updateAssignment = async (
  params: KeyValueType<string>,
  body: Classroom
) => {
  const result = await AssignmentRepository.update(params.assignmentId, body);
  return result;
};

const deleteAssignment = async (params: KeyValueType<string>) => {
  const result = await AssignmentRepository.delete(params.assignmentId);
  return result;
};

export default {
  createAssignment,
  getAllAssignment,
  getOneAssignment,
  updateAssignment,
  deleteAssignment,
};
