import multer from "multer";
import path from "path";
import util from "util";

const maxSize = 50 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve("public/storage"));
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

export const processFile = util.promisify(
  multer({
    storage: storage,
    limits: { fileSize: maxSize },
  }).single("file")
);
