import { Request, Response, NextFunction } from "express";
import httpException from "../exceptions/httpException";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new httpException(404, "Oops! Błąd!");
  next(err);
}

export function catchAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: httpException) => next(err));
  };
}

export function catchErrors(
  err: httpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.status || 500);
  res.json({ message: err.message || "Oops! Błąd!" });
  console.log(err);
}
