import { Classroom } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const ClassroomRepository = PostgresDataSource.getRepository(Classroom);
