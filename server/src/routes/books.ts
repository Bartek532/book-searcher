import express from "express";
import { catchAsync } from "../middlewares/errors";
import booksController from "../controllers/booksController";
import { validateToken } from "../middlewares/validateToken";
import {
  validateUser,
  validateRates,
  validateLibrary
} from "../middlewares/validateData";

const router = express.Router();

router.get("/search", catchAsync(booksController.searchBooks));
router.get("/", catchAsync(booksController.getBooks));
router.get("/book/:slug", catchAsync(booksController.getBook));
router.get("/:series", catchAsync(booksController.searchBySeries));
router.post("/advancedSearch", catchAsync(booksController.advancedSearch));
router.post("/", validateToken, catchAsync(booksController.createBook));
router.put(
  "/rate",
  validateToken,
  catchAsync(validateUser),
  catchAsync(validateRates),
  catchAsync(booksController.rateBook)
);

router.put(
  "/bookmark",
  validateToken,
  catchAsync(validateUser),
  catchAsync(validateLibrary)
);

export default router;
