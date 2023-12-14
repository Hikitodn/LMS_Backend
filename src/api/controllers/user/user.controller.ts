import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import httpStatus from "http-status";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.create(req.body);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUser(req.query);
    res.status(httpStatus.OK);
    res.json({
      user: req.user,
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getOneUser(req.params);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateUser(req.params, req.body);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params);
    res.status(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, getOne, update, remove };
