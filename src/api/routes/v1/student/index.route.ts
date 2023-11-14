import { authMiddleware } from "@middlewares/index";
import { ROLES } from "@utils/instance";
import express from "express";

const router = express.Router();

router.use("/student", authMiddleware.authorize(ROLES[2]));

export default router;
