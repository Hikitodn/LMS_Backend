import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import classroomService from "./classroom.service";
import { toPlainObject } from "lodash";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = classroomService.createClassroom(
      toPlainObject(req.user),
      req.body
    );
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    // const result = classroomService.createClassroom(req.body);
    // res.status(httpStatus.CREATED);
    // res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getById = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    // const result = classroomService.createClassroom(req.body);
    // res.status(httpStatus.CREATED);
    // res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const update = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    // const result = classroomService.createClassroom(req.body);
    // res.status(httpStatus.CREATED);
    // res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = classroomService.deleteClassroom(req.params.id);
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getById, update, remove };
