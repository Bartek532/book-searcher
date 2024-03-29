import express from "express";
import { catchAsync } from "../../middlewares/errors";
import {
  searchBooks,
  getAllBooks,
  getBook,
  moveBook,
  rateBook,
  createBook,
} from "./booksController";
import { validateAuth } from "../../middlewares/validateAuth";
import { validateData } from "../../middlewares/validateData";
import { validateIsAdmin } from "../../middlewares/validateIsAdmin";
import { parseForm } from "../../middlewares/parseForm";
import { validationSchemas } from "../../validationSchemas";

const router = express.Router();

router.get("/search", catchAsync(searchBooks));
router.get("/", catchAsync(getAllBooks));
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
  validateIsAdmin,
  validateData(validationSchemas.bookPosition),
  catchAsync(moveBook),
);

router.post(
  "/",
  validateAuth,
  validateIsAdmin,
  parseForm,
  catchAsync(createBook),
);

export const booksRoute = router;
