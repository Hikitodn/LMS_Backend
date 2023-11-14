import { Assignment } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const AssignmentRepository =
  PostgresDataSource.getRepository(Assignment);
