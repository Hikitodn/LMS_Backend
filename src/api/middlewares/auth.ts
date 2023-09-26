import { User } from "@entities/index";
import { ApiError } from "@errors/api-error";
import { UserRole } from "@utils/instance";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import passport from "passport";

const handleJwt =
  (req: Request, _res: Response, next: NextFunction, role: UserRole) =>
  async (err: unknown, user: User, info: unknown) => {
    const error = err || info;
    const apiError = new ApiError({
      message: "Unauthorized",
      status: httpStatus.UNAUTHORIZED,
    });

    try {
      if (error || !user) throw error;
    } catch (error) {
      return next(apiError);
    }

    if (user && role) {
      if (user.role !== role) {
        apiError.status = httpStatus.FORBIDDEN;
        apiError.message = "Forbidden";
        return next(apiError);
      }
    } else if (!role.includes(user.role)) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = "Forbidden";
      return next(apiError);
    } else if (err || !user) {
      return next(apiError);
    }

    req.user = user;

    return next();
  };

export const authorize =
  (role: UserRole) => (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      handleJwt(req, res, next, role)
    )(req, res, next);
