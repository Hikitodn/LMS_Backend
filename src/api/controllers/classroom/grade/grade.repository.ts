import { Grade } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const GradeRepository = PostgresDataSource.getRepository(Grade);
