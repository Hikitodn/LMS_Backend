import express from "express";

const router = express.Router();

router.route("/").post();

// Assignment
router.route("/:classroomId/document").get().post();
router.route("/:classroomId/document/:documentId").get().patch().delete();

// Document
router.route("/:classroomId/document").get().post();
router.route("/:classroomId/document/:documentId").get().patch().delete();

// Examine
router.route("/:classroomId/document").get().post();
router.route("/:classroomId/document/:documentId").get().patch().delete();

// Grade
router.route("/:classroomId/document").get().post();
router.route("/:classroomId/document/:documentId").get().patch().delete();

export default router;
