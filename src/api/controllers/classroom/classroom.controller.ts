import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import classroomService from "./classroom.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = classroomService.createClassroom(req.body);
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

export default { create };
