import { User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const AuthRepository = PostgresDataSource.getRepository(User);
