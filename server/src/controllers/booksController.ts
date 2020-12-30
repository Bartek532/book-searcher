import { Request, Response } from "express";
import {
  fetchBooks,
  fetchBook,
  fetchBooksBySeries,
  fetchBooksByQuery,
  fetchBooksByFilters,
  deleteBookById,
  advancedFetchBooks,
  updateBookRates,
  insertBook,
  changeBookPosition
} from "../services/books";
import { validateFilters } from "../middlewares/validateData";
import { validateBookPosition } from "../validation";

export const getBooks = async (req: Request, res: Response) => {
  res.status(200).json(await fetchBooks());
};

export const getBook = async (req: Request, res: Response) => {
  res.status(200).json(await fetchBook(req.params.slug));
};

export const searchBySeries = async (req: Request, res: Response) => {
  res.status(200).json(await fetchBooksBySeries(req.params.series));
};

export const deleteBook = async (req: Request, res: Response) => {
  res.status(200).json(await deleteBookById(Number(req.params.id)));
};

export const searchBooks = async (req: Request, res: Response) => {
  if (req.query.q) {
    const data = await fetchBooksByQuery(req.query.q as string);
    res.status(200).json(data);
  } else {
    const data = await fetchBooksByFilters({ ...validateFilters(req) });
    res.status(200).json(data);
  }
};

export const advancedSearch = async (req: Request, res: Response) => {
  const query = {
    name: req.body.name,
    author: req.body.author,
    tags: req.body.tags
  };
  res.status(200).json(await advancedFetchBooks(query));
};

export const rateBook = async (req: Request, res: Response) => {
  if (
    typeof req.body.rate !== "number" ||
    req.body.rate > 6 ||
    req.body.rate < 1
  ) {
    return res.status(400).json({ message: "Niepoprawna wartość." });
  }
  await updateBookRates(req.user!.id, req.body.id, req.body.rate);
  res.status(200).json({ message: "Dziękujemy za opinię!" });
};

export const createBook = async (req: Request, res: Response) => {
  await insertBook(req, res);
};

export const moveBook = async (req: Request, res: Response) => {
  const { error } = validateBookPosition(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  res.status(200).json(await changeBookPosition(req.body));
};
