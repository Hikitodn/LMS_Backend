import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import Joi from "joi";

export const registerValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(error);
    }
  }
};

export const loginValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      next(error);
    }
  }
};
