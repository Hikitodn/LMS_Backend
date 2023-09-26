import { ApiError } from "@errors/api-error";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import env from "src/config/env";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    const respone = {
      status: err.status,
      name: err.name || httpStatus[err.status],
      message: err.message,
      stack: err.stack,
    };

    if (env.nodeEnv !== "development") {
      delete respone.stack;
    }

    res.status(respone.status);
    res.json(respone);
  }
};

export const converter = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let convertedError = err;

  if (err instanceof Joi.ValidationError) {
    convertedError = new ApiError({
      message: err.message,
      status: httpStatus.BAD_REQUEST,
    });
  } else if (!(err instanceof ApiError)) {
    convertedError = new ApiError({
      message: err.message,
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  return handler(convertedError, req, res, next);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new ApiError({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res, next);
};
