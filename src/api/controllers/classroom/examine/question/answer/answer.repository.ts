import { Answer } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const AnswerRepository = PostgresDataSource.getRepository(Answer);
