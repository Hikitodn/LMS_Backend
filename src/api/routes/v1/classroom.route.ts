import express from "express";

const router = express.Router();

// Classroom
router.route("/").get().post();
router.route("/:classroomId").get().patch().delete();

// Document
router.route("/document").get().post();
router.route("/document/:documentId").get().patch().delete();

// Assignment
router.route("/assignment").get().post();
router.route("/assignment/:assignmentId").get().patch().delete();

// Examine
router.route("/examine").get().post();
router.route("/examine/:examineId").get().patch().delete();

// Question
router.route("/question").get().post();
router.route("/question/:questionId").get().patch().delete();

// Answer
router.route("/answer").get().post();
router.route("/answer/:answerId").get().patch().delete();

export default router;
