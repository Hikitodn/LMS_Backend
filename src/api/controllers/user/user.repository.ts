import { Profile, User } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const UserRepository = PostgresDataSource.getRepository(User);
export const ProfileRepository = PostgresDataSource.getRepository(Profile);
