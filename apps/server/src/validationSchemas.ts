import Joi from "joi";

export const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const validationSchemas = {
  login: Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
  }),
  register: Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
  }),
  modifyUser: Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    newPassword: Joi.string().min(8),
    oldPassword: Joi.string().min(8),
  }),
  book: Joi.object({
    room: Joi.string()
      .min(6)
      .required(),
    place: Joi.string()
      .min(3)
      .required(),
    tags: Joi.string(),
    rate: Joi.string()
      .min(1)
      .max(1)
      .required(),
    name: Joi.string()
      .min(3)
      .required(),
    author: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(10)
      .required(),
    series: Joi.string().allow(null, ""),
  }),
  bookPosition: Joi.object({
    id: Joi.number().required(),
    room: Joi.string()
      .min(3)
      .required(),
    place: Joi.string()
      .min(3)
      .required(),
  }),
};
