import { Examine } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const ExamineRepository = PostgresDataSource.getRepository(Examine);
