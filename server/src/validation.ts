import { Request } from "express";
import Joi from "joi";

export const validateLogin = (data: Request) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data);
};

export const validateRegister = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required()
  });

  return schema.validate(data);
};

export const modifyUserWithoutPassword = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    newPassword: Joi.string().min(8),
    oldPassword: Joi.string().min(8)
  });

  return schema.validate(data);
};

export const modifyUserWithPassword = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required()
  });

  return schema.validate(data);
};

export const validateBook = (data: object) => {
  const schema = Joi.object({
    room: Joi.string().min(6).required(),
    place: Joi.string().min(3).required(),
    tags: Joi.string().min(3).required(),
    rate: Joi.string().min(1).max(1).required(),
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    series: Joi.string().allow(null, "")
  });

  return schema.validate(data);
};
