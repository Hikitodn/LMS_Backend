import { ClassroomController } from "@controllers/index";
import { authMiddleware } from "@middlewares/index";
import TeacherRoute from "./teacher/index.route";
import StudentRoute from "./student/index.route";
import AdminRoute from "./admin/index.route";
import express from "express";

const router = express.Router();

router
  .use(TeacherRoute)
  .use(StudentRoute)
  .use(AdminRoute)
  .route("/:classroomId")
  .get(authMiddleware.authorize(), ClassroomController.getOne);

export default router;
