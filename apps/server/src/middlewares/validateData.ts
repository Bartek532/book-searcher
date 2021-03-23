import Joi from 'joi';
import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = jwt.decode(req.authToken) as { id: number; iat: number };

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.status(400).json({ message: "Nie znaleziono użytkownika." });
  }

  req.user = user;
  next();
};

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

export const validateLibrary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isInLibrary = await prisma.userBookLibrary.findMany({
    where: { AND: [{ userId: req.user!.id }, { bookId: req.body.id }] }
  });
  if (isInLibrary.length) {
    return res
      .status(400)
      .json({ message: "Już masz tą książkę w bibliotece." });
  }

  await prisma.userBookLibrary.create({
    data: {
      Book: { connect: { id: req.body.id } },
      User: { connect: { id: req.user!.id } }
    }
  });

  res.status(200).json({ message: "Dodano książkę do biblioteki." });
};

*/

export const validateFilters = ({ query }: Request) => {
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
    Object.entries(query).filter(item => availableFilters.indexOf(item[0]) > -1)
  );
};


export const validateData = (schema: Joi.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if(error){
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}