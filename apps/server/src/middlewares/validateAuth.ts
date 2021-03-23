import type { Request, Response, NextFunction } from 'express';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.isLogged){
        next();
    } else {
        return res.status(409).json({ message: "Brak dostępu. Zaloguj się!"})
    }
}