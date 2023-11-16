import { DataSource } from "typeorm";
import env from "./env";
import * as entities from "@entities/index";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: env.db_username,
  password: env.db_password,
  database: env.db_name,
  synchronize: env.nodeEnv === "development" ? true : false,
  logging: true,
  logger: "file",
  entities: [...Object.values(entities)],
  subscribers: [],
  migrations: [],
});

export const db_connect = async () => {
  try {
    await PostgresDataSource.initialize();
    console.log("Data Source has been initialized successfully!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};
