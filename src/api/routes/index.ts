import express from "express";
import AuthRouter from "./v1/auth.route";
import UserRouter from "./v1/user.route";

const router = express.Router();

// Routes v1
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);

export default router;
