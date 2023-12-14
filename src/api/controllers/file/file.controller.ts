// import { fileMiddleware } from "@middlewares/index";
import { NextFunction, Request, Response } from "express";
import fileService from "./file.service";

const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.file) fileService.uploadToBlobStorage(req.file, res.locals.label);
    res.json();
  } catch (error) {
    next(error);
  }
};

// const getListFiles = async (req, res) => {};

// const download = async (req, res) => {};

export default { upload };
