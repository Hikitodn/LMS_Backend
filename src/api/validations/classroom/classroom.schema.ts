import Joi from "joi";

const name = Joi.string().required().messages({
  "string.base": "Name field must be string",
  "string.empty": "Name field is required",
});

const description = Joi.string().messages({
  "string.base": "Description field must be string",
});

export const classroomSchema = Joi.object({
  name,
  description,
});
