import { UserController } from "@controllers/index";
import { userValidation } from "@validations/user/user.validation";
import express from "express";

const router = express.Router();

router.route("/").get(UserController.getAllUser);

router.route("/:id").get(UserController.getOneUser);

router.route("/create").post(userValidation, UserController.createUser);

export default router;
