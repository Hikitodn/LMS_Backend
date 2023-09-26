import express from "express";
import AuthRouter from "./v1/auth.route";
import UserRouter from "./v1/user.route";
import { authMiddleware } from "@middlewares/index";
import { UserRole } from "@utils/instance";

const router = express.Router();

// Routes v1
router.use("/auth", AuthRouter);
router.use("/user", authMiddleware.authorize(UserRole.ADMIN), UserRouter);

export default router;
