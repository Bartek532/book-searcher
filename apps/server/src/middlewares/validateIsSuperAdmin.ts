import type { Request, Response, NextFunction } from "express";

export const validateIsSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.user?.isSuperAdmin) {
    next();
  } else {
    return res.status(409).json({ message: "Brak dostępu. Zaloguj się!" });
  }
};
