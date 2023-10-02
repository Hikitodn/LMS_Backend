import { AuthController } from "@controllers/index";
import {
  loginValidation,
  registerValidation,
} from "@validations/auth/auth.validation";
import express from "express";

const router = express.Router();

/**
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}                  email                User's email
 * @apiParam  {String{8..20}}           password             User's password
 * @apiParam  {String{8..20}}           password_repeat      User's password_repeat
 * @apiParam  {String{5..20}}           name                 User's name
 * @apiParam  {Date}                    date_of_birth        User's date_of_birth
 * @apiParam  {String="male","female"}  gender               User's gender
 *
 * @apiSuccess (Created 201) {String}  token.tokenType              Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken            Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken           Token to get a new accessToken after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn              Access Token's expiration time in miliseconds
 * @apiSuccess (Created 201) {String}  user.id                      User's id
 * @apiSuccess (Created 201) {String}  user.name                    User's name
 * @apiSuccess (Created 201) {Boolean} user.isVerified              User's isVerified
 * @apiSuccess (Created 201) {String}  user.role                    User's role
 * @apiSuccess (Created 201) {String}  user.protfile.photo_path     User's photo_path
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route("/register").post(registerValidation, AuthController.register);

/**
 * @api {post} v1/auth/Login Login
 * @apiDescription Login with existed user
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}                  email                User's email
 * @apiParam  {String{8..20}}           password             User's password
 *
 * @apiSuccess (Created 201) {String}  token.tokenType              Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken            Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken           Token to get a new accessToken after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn              Access Token's expiration time in miliseconds
 * @apiSuccess (Created 201) {String}  user.id                      User's id
 * @apiSuccess (Created 201) {String}  user.name                    User's name
 * @apiSuccess (Created 201) {Boolean} user.isVerified              User's isVerified
 * @apiSuccess (Created 201) {String}  user.role                    User's role
 * @apiSuccess (Created 201) {String}  user.protfile.photo_path     User's photo_path
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route("/login").post(loginValidation, AuthController.login);

router.route("/refresh").post(AuthController.refresh);

router.route("/logout").delete(AuthController.logout);

export default router;
