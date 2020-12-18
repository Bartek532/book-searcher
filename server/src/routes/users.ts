import express from "express";
import usersController from "../controllers/usersController";
import { catchAsync } from "../middlewares/errors";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

router.post("/login", catchAsync(usersController.login));
router.post("/register", catchAsync(usersController.register));
router.post("/activate", catchAsync(usersController.activateAccount));
router.get("/logout", usersController.logout);
router.get("/islogin", validateToken);

export default router;
