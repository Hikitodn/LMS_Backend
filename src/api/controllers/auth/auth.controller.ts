import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import httpStatus from "http-status";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newUser } = req.body;
    const result = authService.createUserAndGenerateToken(newUser);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//   } catch (error) {
//     next(error);
//   }
// };

export default { register };
