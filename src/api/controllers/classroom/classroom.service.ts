import { Classroom } from "@entities/index";
import { ClassroomRepository } from "./classroom.repository";

const createClassroom = async (body: Classroom) => {
  const result = await ClassroomRepository.insert(body);
  return result;
};

export default {
  createClassroom,
};
