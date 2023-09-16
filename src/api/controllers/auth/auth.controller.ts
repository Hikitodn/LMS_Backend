import { NextFunction, Request, Response } from "express";
import { UserDTO } from "./user.dto";
import AuthService from "./auth.service";
import httpStatus from "http-status";
// import { validateOrReject } from "class-validator";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = new UserDTO();
    user = req.body;

    const result = await AuthService.create(user);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { register };
