import { authMiddleware } from "@middlewares/index";
import AdminRoute from "./admin/index.route";
import express from "express";
import { LOGGED_USER } from "@utils/instance";
import { UserController } from "@controllers/index";

const router = express.Router();

router
  .use(AdminRoute)
  .route("/:userId")
  .get(authMiddleware.authorize(), UserController.getOne)
  .patch(authMiddleware.authorize(LOGGED_USER), UserController.update);

export default router;
