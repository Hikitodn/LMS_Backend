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
      "Your password must have number and the first letter should be uppercase",
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

const role = Joi.string().valid("student", "teacher").messages({
  "any.only": "Only accept certain options [student, teacher]",
});

const date_of_birth = Joi.date().messages({
  "date.base": "Invalid date format",
});

const gender = Joi.string().valid("male", "female").messages({
  "any.only": "Only accept certain options [male, female]",
});

export const registerSchema = Joi.object({
  email,
  password,
  password_repeat,
  name,
  role,
  profile: {
    date_of_birth,
    gender,
  },
});

export const loginSchema = Joi.object({
  email,
  password,
});
