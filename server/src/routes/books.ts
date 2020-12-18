import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  searchBooks,
  getBooks,
  getBook,
  searchBySeries,
  advancedSearch,
  createBook,
  rateBook
} from "../controllers/booksController";
import { validateToken } from "../middlewares/validateToken";
import {
  validateUser,
  validateRates,
  validateLibrary
} from "../middlewares/validateData";

const router = express.Router();

router.get("/search", catchAsync(searchBooks));
router.get("/", catchAsync(getBooks));
router.get("/book/:slug", catchAsync(getBook));
router.get("/:series", catchAsync(searchBySeries));
router.post("/advancedSearch", catchAsync(advancedSearch));
router.post("/", validateToken, catchAsync(createBook));
router.put(
  "/rate",
  validateToken,
  catchAsync(validateUser),
  catchAsync(validateRates),
  catchAsync(rateBook)
);

router.put(
  "/bookmark",
  validateToken,
  catchAsync(validateUser),
  catchAsync(validateLibrary)
);

export default router;
