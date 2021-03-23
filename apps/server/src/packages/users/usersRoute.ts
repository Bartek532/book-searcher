import express from "express";
import {
  login,
  register,
  logout,
  activateAccount,
  getUserInfo,
  modifyUserInfo,
  checkLoginStatus,
  getUserBooks,
  addBookToUserBooks,
  deleteBookFromUserBooks,
} from "./usersController";
import { catchAsync } from "../../middlewares/errors";
import { validateData } from "../../middlewares/validateData";
import { validateAuth } from "../../middlewares/validateAuth";
import { validationSchemas } from "../../validationSchemas";

const router = express.Router();

router.post(
  "/session",
  validateData(validationSchemas.login),
  catchAsync(login),
);
router.post(
  "/",
  validateData(validationSchemas.register),
  catchAsync(register),
);

router.delete("/session", logout);
router.get("/session/me", validateAuth, checkLoginStatus);
router.post("/activate", catchAsync(activateAccount));

router.get("/", validateAuth, catchAsync(getUserInfo));

router.put(
  "/",
  validateAuth,
  validateData(validationSchemas.modifyUser),
  catchAsync(modifyUserInfo),
);

router.get("/books", validateAuth, catchAsync(getUserBooks));
router.post("/books", validateAuth, catchAsync(addBookToUserBooks));
router.delete("/books/:id", validateAuth, catchAsync(deleteBookFromUserBooks));

export const usersRoute = router;
