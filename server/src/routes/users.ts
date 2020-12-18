import express from "express";
import {
  login,
  register,
  activateAccount,
  logout
} from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

router.post("/login", catchAsync(login));
router.post("/register", catchAsync(register));
router.post("/activate", catchAsync(activateAccount));
router.get("/logout", logout);
router.get("/islogin", validateToken);

export default router;
