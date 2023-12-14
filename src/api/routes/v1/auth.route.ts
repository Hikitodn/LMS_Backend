import { AuthController } from "@controllers/index";
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

export default router;
