import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import httpStatus from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.create(req.body);
    res.status(httpStatus.CREATED);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll(req.query);
    res.status(httpStatus.OK);
    res.json({
      user: req.user,
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getById(req.params.id);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.updateById(req.params.id, req.body);
    res.status(httpStatus.OK);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.OK);
    // res.json(result);
  } catch (error) {
    next(error);
  }
};

export default { createUser, getAllUser, getOneUser, updateUser, deleteUser };
