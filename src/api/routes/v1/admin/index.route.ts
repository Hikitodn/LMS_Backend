import { authMiddleware } from "@middlewares/index";
import { ROLES } from "@utils/instance";
import express from "express";

const router = express.Router();

router.use("/admin", authMiddleware.authorize(ROLES[0]));

export default router;
