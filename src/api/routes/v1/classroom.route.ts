import classroomController from "@controllers/classroom/classroom.controller";
import { ClassroomController } from "@controllers/index";
import { authMiddleware } from "@middlewares/index";
import { LOGGED_USER, ROLES } from "@utils/instance";
import express from "express";

const router = express.Router();

// Classroom
router
  .route("/")
  .get(authMiddleware.authorize(ROLES[1]), ClassroomController.getAllByUserId)
  .post(authMiddleware.authorize(ROLES[1]), ClassroomController.create);
router
  .route("/:classroomId")
  .get(authMiddleware.authorize(), ClassroomController.getOneById)
  .patch(authMiddleware.authorize(LOGGED_USER), classroomController.update)
  .delete(authMiddleware.authorize(LOGGED_USER), ClassroomController.remove);

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
