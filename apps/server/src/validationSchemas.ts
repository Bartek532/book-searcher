import Joi from "joi";
import { rooms, places } from "@book-searcher/data";

export const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const validationSchemas = {
  login: Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  }),
  register: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required().valid(Joi.ref("password")),
  }),
  modifyUser: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    newPassword: Joi.string().min(8).required(),
    oldPassword: Joi.string().min(8).required(),
    confirmPassword: Joi.string()
      .min(8)
      .required()
      .valid(Joi.ref("newPassword")),
  }),
  book: Joi.object({
    room: Joi.string()
      .required()
      .valid(...rooms),
    place: Joi.string()
      .required()
      .valid(...Object.values(places).flat(Infinity)),
    tags: Joi.string(),
    rate: Joi.number().integer().min(1).max(6).required(),
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    series: Joi.string().allow(null, ""),
  }).strict(),
  bookPosition: Joi.object({
    id: Joi.number().required().integer(),
    room: Joi.string()
      .required()
      .valid(...rooms),
    place: Joi.string()
      .required()
      .valid(...Object.values(places).flat(Infinity)),
  }).strict(),
  rate: Joi.object({
    id: Joi.number().integer().required(),
    rate: Joi.number().integer().min(1).max(6).required(),
  }).strict(),
};
