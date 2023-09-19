import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { userSchema } from "./user.schema";

export const userValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(error);
    }
  }
};
