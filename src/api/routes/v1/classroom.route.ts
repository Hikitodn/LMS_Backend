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

// Document
router.route("/:classroomId/document").get().post();
router.route("/:classroomId/document/:documentId").get().patch().delete();

// Assignment
router.route("/:classroomId/assignment").get().post();
router.route("/:classroomId/assignment/:assignmentId").get().patch().delete();

// Examine
router.route("/:classroomId/examine").get().post();
router.route("/:classroomId/examine/:examineId").get().patch().delete();

// Question
router.route("/:classroomId/question").get().post();
router.route("/:classroomId/question/:questionId").get().patch().delete();

// Answer
router.route("/:classroomId/answer").get().post();
router.route("/:classroomId/answer/:answerId").get().patch().delete();

export default router;
