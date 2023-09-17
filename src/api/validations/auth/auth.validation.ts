import { NextFunction, Request, Response } from "express";
import { authSchema } from "./auth.schema";
import Joi from "joi";

export const authValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await authSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(error);
    }
  }
};
