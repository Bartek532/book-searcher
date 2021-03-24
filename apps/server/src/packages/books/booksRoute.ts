import express from "express";
import { catchAsync } from "../../middlewares/errors";
import {
  searchBooks,
  getAllBooks,
  getBook,
  searchBySeries,
  moveBook,
  rateBook,
  /*
  createBook,
  */
} from "./booksController";
import { validateAuth } from "../../middlewares/validateAuth";
import { validateData } from "../../middlewares/validateData";
import { validationSchemas } from "../../validationSchemas";

const router = express.Router();

router.get("/search", catchAsync(searchBooks));
router.get("/", catchAsync(getAllBooks));
router.get("/series", catchAsync(searchBySeries));
router.post(
  "/rate",
  validateAuth,
  validateData(validationSchemas.rate),
  catchAsync(rateBook),
);

router.get("/:slug", catchAsync(getBook));
router.put(
  "/",
  validateAuth,
  validateData(validationSchemas.bookPosition),
  catchAsync(moveBook),
);

export const booksRoute = router;
