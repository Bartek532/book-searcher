import Joi from 'joi';
import type { Request, Response, NextFunction } from "express";
import type { Filters } from '@book-searcher/types';


export const validateFilters = (query: Partial<Filters>): Partial<Filters> => {
  const availableFilters = [
    "id",
    "name",
    "author",
    "slug",
    "room",
    "place",
    "series"
  ];
  return Object.fromEntries(
    Object.entries(query).filter(item => availableFilters.includes(item[0])).map(item => {
      if(item[0] === "id"){
        return ["id", Number(item[1])]
      }

      return item;
    })
  );
};


export const validateData = (schema: Joi.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if(error){
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}