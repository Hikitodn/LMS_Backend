import Joi from "joi";

const email = Joi.string().email().lowercase().trim().required().messages({
  "string.base": "Email field must be string",
  "string.email": "Must be an email",
  "string.empty": "Email field is required",
});

const password = Joi.string()
  .ruleset.min(8)
  .max(20)
  .rule({ message: "Password must be between 8 and 20" })
  .trim()
  .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  .required()
  .messages({
    "string.empty": "Password field is required",
    "string.pattern.base":
      "Atleast one number, letter and the first letter should be uppercase letter",
  });

const password_repeat = Joi.any()
  .required()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Password must match",
  });

const name = Joi.string()
  .ruleset.min(5)
  .max(20)
  .rule({ message: "Name must be between 8 and 20" })
  .trim()
  .required()
  .messages({
    "string.base": "Name field must be string",
    "string.empty": "Name field is required",
  });

export const authSchema = Joi.object({
  email,
  password,
  password_repeat,
  name,
});
