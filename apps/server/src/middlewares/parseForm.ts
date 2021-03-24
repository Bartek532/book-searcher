import type { Request, Response, NextFunction } from "express";
import formidable from 'formidable';

export const parseForm = (req: Request, res: Response, next: NextFunction) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if(err){
            throw err;
        }

        if(!Object.values(files).length){
            return res.status(400).json({ message: "Nie dodano pliku. "})
        }

        res.locals.fields = fields;
        res.locals.files = files;
        next()
    })
}