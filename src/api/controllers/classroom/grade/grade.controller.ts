// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";

// const create = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await classroomService.createClassroom(req.params, req.body);
//     res.status(httpStatus.CREATED);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAll = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await classroomService.getAllClassrooms(
//       req.params,
//       req.body
//     );
//     res.status(httpStatus.OK);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const getOne = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await classroomService.getOneClassroom(req.params);
//     res.status(httpStatus.OK);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const update = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await classroomService.updateClassroom(req.params, req.body);
//     res.status(httpStatus.OK);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// const remove = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await classroomService.deleteClassroom(req.params);
//     res.status(httpStatus.NO_CONTENT);
//     res.json({ user: req.user, result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// export default { create, getAll, getOne, update, remove };
