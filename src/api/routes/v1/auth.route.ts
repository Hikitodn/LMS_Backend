import { AuthController } from "@controllers/index";
import { authMiddleware } from "@middlewares/index";
import { LOGGED_USER } from "@utils/instance";
import {
  loginValidation,
  registerValidation,
} from "@validations/auth/auth.validation";
import express from "express";

const router = express.Router();

router.route("/login").post(loginValidation, AuthController.login);

router.route("/register").post(registerValidation, AuthController.register);

router.route("/refresh").post(AuthController.refresh);

router.route("/logout").delete(AuthController.logout);

router
  .route("/profile/:userId")
  .get(authMiddleware.authorize(), AuthController.profile)
  .patch(authMiddleware.authorize(LOGGED_USER), AuthController.update);

export default router;
