import { ApiError } from "@errors/api-error";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import env from "src/config/env";
// import Joi from "joi";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const respone = {
    code: err.status,
    name: err.name,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env.nodeEnv !== "development") {
    delete respone.stack;
  }

  res.status(err.status);
  res.json(respone);
};

// export const converter = (
//   err: Joi.ValidationError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const convertedError = new ApiError({
//     message: "Validation Error",
//     errors: err.name,
//     status: httpStatus.BAD_REQUEST,
//     isPublic: false,
//   });

//   return handler(convertedError, req, res, next);
// };
