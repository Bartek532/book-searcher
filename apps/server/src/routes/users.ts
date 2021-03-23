import express from "express";
import {
  login,
  register,
  activateAccount,
  getUser,
  modifyUserData,
  logout,
  getUserLibrary,
  deleteFromUserLibrary
} from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateData";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.post("/activate", catchAsync(activateAccount));
router.get(
  "/user/info",
  validateToken,
  catchAsync(validateUser),
  catchAsync(getUser)
);

router.post(
  "/user/modify",
  validateToken,
  validateUser,
  catchAsync(modifyUserData)
);

router.get("/logout", logout);
router.get("/islogin", validateToken);

router.get(
  "/library",
  validateToken,
  catchAsync(validateUser),
  catchAsync(getUserLibrary)
);

router.put(
  "/deleteFromLibrary",
  validateToken,
  catchAsync(validateUser),
  catchAsync(deleteFromUserLibrary)
);

export default router;
