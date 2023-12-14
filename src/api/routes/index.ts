import express from "express";
import AuthRouter from "./v1/auth.route";
import UserRouter from "./v1/user.route";
import ClassroomRouter from "./v1/classroom.route";
import fileController from "@controllers/file/file.controller";
import { fileMiddleware } from "@middlewares/index";

const router = express.Router();

// Routes v1
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/classroom", ClassroomRouter);
router.post(
  "/file",
  fileMiddleware.handleFile("document"),
  fileController.upload
);

export default router;
