import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import httpStatus from "http-status";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.createUserAndGenerateToken(req.body);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.verifyUserAndGenerateToken(req.body);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.refreshToken(req.headers.authorization);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.deleteRefreshToken(req.headers.authorization);
    res.status(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default { register, login, refresh, logout };
