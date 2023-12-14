import { Request, Response, NextFunction } from "express";
import multer from "multer";
import util from "util";

const maxSize = 50 * 1024 * 1024;

const processMulter = (label: string) =>
  util.promisify(
    multer({
      limits: { fileSize: maxSize },
    }).single(label)
  );

export const handleFile =
  (label: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await processMulter(label)(req, res);
      res.locals.label = label;
    } catch (error) {
      next(error);
    }

    return next();
  };
