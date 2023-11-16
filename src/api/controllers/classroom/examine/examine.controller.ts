import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import examineService from "./examine.service";
import { toPlainObject } from "lodash";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await examineService.createExamine(
      toPlainObject(req.user),
      req.params.id,
      req.body
    );
    res.status(httpStatus.CREATED);
    res.json({ user: req.user, result: result });
  } catch (error) {
    next(error);
  }
};

// const getAll = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await examineService.getAllexamine(
//       toPlainObject(req.params),
//       toPlainObject(req.query)
//     );
//     res.status(httpStatus.CREATED);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOne = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await examineService.getOneexamine(req.params.id);
//     res.status(httpStatus.OK);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await examineService.updateexamine(
//       req.params.classroomId,
//       req.body
//     );
//     res.status(httpStatus.OK);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await examineService.deleteexamine(req.params.classroomId);
//     res.status(httpStatus.NO_CONTENT);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  create,
  // , getAll, getOne, update, remove
};
