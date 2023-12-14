// import blobStorageService from "@services/blobStorageService";
// import { KeyValueType } from "@utils/instance";
import { FileRepository } from "./file.repository";

const uploadToBlobStorage = (file: Express.Multer.File, label: string) => {
  FileRepository.validateFileType(file, label);

  // blobStorageService.containerClient
  //   .getBlockBlobClient("test")
  //   .uploadData(req);
};

export default { uploadToBlobStorage };
