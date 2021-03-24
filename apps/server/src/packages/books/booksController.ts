import { Request, Response } from "express";
import {
  fetchBooks,
  fetchBook,
  fetchBooksBySeries,
  fetchSeries,
  fetchBooksByQuery,
  fetchBooksByFilters,
  advancedFetchBooks,
  changeBookPosition,
  updateBookRates,
  /*
  updateBookRates,
  insertBook,
  changeBookPosition,
  */
} from "./booksService";

import { validateFilters } from "../../middlewares/validateData";

export const getAllBooks = async (req: Request, res: Response) => {
  res.status(200).json(await fetchBooks());
};

export const getBook = async (req: Request, res: Response) => {
  res.status(200).json(await fetchBook(req.params.slug));
};

export const searchBySeries = async (req: Request, res: Response) => {
  if (req.body.series) {
    return res.status(200).json(await fetchBooksBySeries(req.params.series));
  }

  return res.status(200).json(await fetchSeries());
};

export const searchBooks = async (req: Request, res: Response) => {
  if (req.query.type === "basic") {
    if (req.query.q) {
      const data = await fetchBooksByQuery(req.query.q as string);
      return res.status(200).json(data);
    }

    const filters = validateFilters(req.query);

    if (Object.keys(filters).length) {
      const data = await fetchBooksByFilters(filters);
      return res.status(200).json(data);
    }

    return res
      .status(200)
      .json({ message: "Nieprawidłowe filtry wyszukiwania." });
  }
  if (req.query.type === "advanced") {
    const query = {
      name: req.body.name,
      author: req.body.author,
      tags: req.body.tags,
    };
    return res.status(200).json(await advancedFetchBooks(query));
  }

  return res.status(400).json({ message: "Nieprawidłowy typ wyszukiwania. " });
};

export const moveBook = async (req: Request, res: Response) => {
  res.status(200).json(
    await changeBookPosition({
      id: req.body.id,
      place: req.body.place,
      room: req.body.room,
    }),
  );
};

export const rateBook = async (req: Request, res: Response) => {
  await updateBookRates(req.session.user!.id, req.body.id, req.body.rate);
  res.status(200).json({ message: "Dziękujemy za opinię!" });
};

/*


export const createBook = async (req: Request, res: Response) => {
  await insertBook(req, res);
};



*/
