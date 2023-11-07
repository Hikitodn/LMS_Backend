import { Document } from "@entities/index";
import { PostgresDataSource } from "src/config/db_connect";

export const DocumentRepository = PostgresDataSource.getRepository(Document);
