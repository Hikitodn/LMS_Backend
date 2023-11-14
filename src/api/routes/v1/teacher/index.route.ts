import { authMiddleware } from "@middlewares/index";
import { ROLES } from "@utils/instance";
import ClassroomTeacherRoute from "./classroom.route";
import express from "express";

const router = express.Router();

router.use(
  "/teacher",
  authMiddleware.authorize(ROLES[1]),
  ClassroomTeacherRoute
);

export default router;
