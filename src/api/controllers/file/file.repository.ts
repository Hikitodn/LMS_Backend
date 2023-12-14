import { FileUpload } from "@entities/file_upload.entity";
import { ApiError } from "@errors/api-error";
import httpStatus from "http-status";
import { PostgresDataSource } from "src/config/db_connect";

export const FileRepository = PostgresDataSource.getRepository(
  FileUpload
).extend({
  validateFileType(file: Express.Multer.File, label: string) {
    const avatarType = ["jpg", "jpeg", "png"];
    const documentType = ["doc", "docx"];
    const ext = file.originalname.split(".")[1];
    const err = {
      message: "File type invalid",
      status: httpStatus.UNPROCESSABLE_ENTITY,
    };

    switch (label) {
      case "avatar":
        if (!avatarType.includes(ext)) throw new ApiError(err);
        break;

      case "document":
        if (!documentType.includes(ext)) throw new ApiError(err);
        break;

      default:
        break;
    }
  },
});
