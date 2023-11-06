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

const getAllByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await classroomService.getClassrooms(
      toPlainObject(req.user).id,
      toPlainObject(req.query)
    );
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.getClassroomById(req.params.id);
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await classroomService.patchClassroom(
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

export default { create, getAllByUserId, getOneById, update, remove };
