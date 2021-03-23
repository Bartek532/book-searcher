import e, { Request, Response } from "express";
import {
  validateLogin,
  validateRegister,
  modifyUserWithPassword,
  modifyUserWithoutPassword
} from "../validation";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserByToken,
  activateUser,
  createUser,
  addUserToken,
  updateUserInfo,
  getUserBooks,
  deleteBookFromUserLibrary
} from "../services/users";
import { sendMail } from "../middlewares/sendEmail";

const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const login = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Wygląda, że nie masz jeszcze konta, załóż je!" });
  }

  if (!user.isActive) {
    return res.status(400).json({ message: "Aktywuj swoje konto!" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Błędne hasło." });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN as string);

  res
    .header("Set-Cookie", `token=${token}; path=/; httpOnly; SameSite=Lax`)
    .json({ message: "Zalogowano" });
};

export const register = async (req: Request, res: Response) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const isUserExists = await findUserByEmail(req.body.email);
  if (isUserExists) {
    return res.status(409).json({ message: "Konto już istnieje." });
  }

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      message: "Hasło nie spełnia wymagań."
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const token = crypto.randomBytes(16).toString("hex");

  const data = {
    name: req.body.name,
    email: req.body.email,
    address: `https://book-searcher-library.herokuapp.com/auth/activate/${token}`
  };

  try {
    await sendMail(data);
    const user = await createUser(
      req.body.name,
      req.body.email,
      hashedPassword
    );
    await addUserToken(user.id, token);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Oops, coś poszło nie tak, spróbuj ponownie." });
  }
};

export const getUser = async (req: Request, res: Response) => {
  res.status(200).json(await findUserByEmail(req.user!.email));
};

export const modifyUserData = async (req: Request, res: Response) => {
  if (!req.body.newPassword || !req.body.oldPassword) {
    const { error } = modifyUserWithoutPassword(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    return res
      .status(200)
      .json(await updateUserInfo(req.user!.id, req.body.name, req.body.email));
  }

  const { error } = modifyUserWithPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await findUserByEmail(req.user!.email);

  if (!passwordRegex.test(req.body.newPassword)) {
    return res.status(400).json({
      message: "Hasło nie spełnia wymagań."
    });
  }

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user!.password
  );
  if (!validPassword) {
    return res.status(401).json({ message: "Błędne hasło." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  res
    .status(200)
    .json(
      await updateUserInfo(
        req.user!.id,
        req.body.name,
        req.body.email,
        hashedPassword
      )
    );
};

export const activateAccount = async (req: Request, res: Response) => {
  const user = await findUserByToken(req.body.token);

  if (!user) {
    return res.status(404).json({ message: "Nie znaleziono użytkownika. " });
  }

  if (user.isActive) {
    return res
      .status(400)
      .json({ message: "Twoje konto zostało już aktywowane, zaloguj się!" });
  }

  await activateUser(user.id);

  res.status(200).json({ message: "Twoje konto zostało aktywowane!" });
};

export const logout = (req: Request, res: Response) => {
  res.status(200).clearCookie("token").json({ message: "Wylogowano!" });
};

export const getUserLibrary = async (req: Request, res: Response) => {
  res.status(200).json(await getUserBooks(req.user!.id));
};

export const deleteFromUserLibrary = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(await deleteBookFromUserLibrary(req.user!.id, req.body.id));
};
