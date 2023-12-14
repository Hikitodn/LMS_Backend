import { authMiddleware } from "@middlewares/index";
import { ROLES } from "@utils/instance";
import ClassroomRoute from "./classroom.route";
import UserRoute from "./user.route";
import express from "express";

const router = express.Router();

router.use(
  "/admin",
  authMiddleware.authorize(ROLES[0]),
  ClassroomRoute,
  UserRoute
);

export default router;
