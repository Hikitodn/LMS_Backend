import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import assignmentService from "./assignment.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await assignmentService.createAssignment(
      req.params,
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
    const result = await assignmentService.getAllAssignment(
      req.params,
      req.body
    );
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await assignmentService.getOneAssignment(req.params);
    res.status(httpStatus.OK);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await assignmentService.updateAssignment(
      req.params,
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
    const result = await assignmentService.deleteAssignment(req.params);
    res.status(httpStatus.NO_CONTENT);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getOne, update, remove };
