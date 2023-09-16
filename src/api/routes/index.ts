import express from "express";
import AuthRouter from "./v1/auth.route";

const router = express.Router();

// Routes v1
router.use("/auth", AuthRouter);

export default router;
