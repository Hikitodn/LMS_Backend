import { DataSource } from "typeorm";
import env from "./env";

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: env.db_username,
  password: env.db_password,
  database: env.db_name,
  synchronize: true,
  logging: true,
  entities: ["../api/models/*"],
  subscribers: [],
  migrations: [],
});

const connect = async () => {
  try {
    await PostgresDataSource.initialize();
    console.log("Data Source has been initialized successfully!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

export default { connect, PostgresDataSource };
