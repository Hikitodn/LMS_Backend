import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import classroomService from "./classroom.service";
import { toPlainObject } from "lodash";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.createClassroom(
      toPlainObject(req.user),
      req.body
    );
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.getAllClassrooms(
      toPlainObject(req.user).id,
      toPlainObject(req.query)
    );
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.getOneClassroom(req.params.id);
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.updateClassroom(
      req.params.classroomId,
      req.body
    );
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.deleteClassroom(
      req.params.classroomId
    );
    res.status(httpStatus.NO_CONTENT);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getOne, update, remove };
