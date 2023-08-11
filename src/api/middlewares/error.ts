import { ApiError } from "@errors/api-error";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import env from "src/config/env";

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
