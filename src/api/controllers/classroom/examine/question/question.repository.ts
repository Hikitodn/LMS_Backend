import { Question } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const QuestionRepository = PostgresDataSource.getRepository(Question);
