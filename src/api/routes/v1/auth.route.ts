import { AuthController } from "@controllers/index";
import express from "express";

const router = express.Router();

router
  .route("/register")
  /**
   * @api {post} v1/auth/register Register
   * @apiDescription Register a new user
   * @apiVersion 1.0.0
   * @apiName Register
   * @apiGroup Auth
   * @apiPermission public
   *
   * @apiParam  {String}          email     User's email
   * @apiParam  {String{5..20}}  password  User's password
   *
   * @apiSuccess (Created 201) {String}  user.id         User's id
   * @apiSuccess (Created 201) {String}  user.email      User's email
   * @apiSuccess (Created 201) {String}  user.name       User's name
   * @apiSuccess (Created 201) {String}  user.role       User's role
   * @apiSuccess (Created 201) {Date}    user.createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   */
  .post(AuthController.register);

export default router;
