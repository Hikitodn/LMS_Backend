import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import httpStatus from "http-status";
import { User } from "@entities/index";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.name = req.body.name;
    const result = AuthService.create(newUser);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { register };
