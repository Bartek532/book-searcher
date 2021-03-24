import Joi from 'joi';
import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import type { Filters } from '@book-searcher/types';

const prisma = new PrismaClient();

/*

export const validateRates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.id && req.body.rate) {
    const isRated = await prisma.userBookRate.findMany({
      where: { AND: [{ userId: req.user!.id }, { bookId: req.body.id }] }
    });
    if (isRated.length) {
      return res.status(400).json({ message: "Już oceniałeś tą książkę!" });
    }
    next();
  } else {
    return res.status(400).json({ message: "Błędne dane." });
  }
};


*/

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