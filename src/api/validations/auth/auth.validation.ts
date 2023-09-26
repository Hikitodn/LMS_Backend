import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";

export const registerValidation = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await registerSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
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
    next(error);
  }
};
