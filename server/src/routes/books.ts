import express from "express";
import { catchAsync } from "../middlewares/errors";
import {
  searchBooks,
  getBooks,
  getBook,
  searchBySeries,
  advancedSearch,
  createBook,
  rateBook,
  deleteBook,
  moveBook
} from "../controllers/booksController";
import { validateToken } from "../middlewares/validateToken";
import {
  validateUser,
  validateRates,
  validateLibrary
} from "../middlewares/validateData";

const router = express.Router();

router.get("/search", catchAsync(searchBooks));
router.delete("/book/:id", catchAsync(deleteBook));
router.get("/", catchAsync(getBooks));
router.get("/book/:slug", catchAsync(getBook));
router.get("/:series", catchAsync(searchBySeries));
router.post("/advancedSearch", catchAsync(advancedSearch));
router.post(
  "/",
  validateToken,
  catchAsync(validateUser),
  catchAsync(createBook)
);
router.put(
  "/move",
  validateToken,
  catchAsync(validateUser),
  catchAsync(moveBook)
);
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
