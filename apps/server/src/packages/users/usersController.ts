import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  findUserByEmail,
  findUserByToken,
  activateUser,
  createUser,
  addUserToken,
  updateUserInfo,
  fetchUserLibrary,
  fetchUserBook,
  addBookToUserLibrary,
  deleteBookFromUserLibrary,
} from "./usersService";
import { passwordRegex } from "../../validationSchemas";
import { sendMail } from "../../middlewares/sendEmail";

export const login = async (req: Request, res: Response) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    return res.status(404).json({ message: "Nieprawidłowy login lub hasło!" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(404).json({ message: "Nieprawidłowy login lub hasło!" });
  }

  if (!user.isActive) {
    return res.status(400).json({ message: "Aktywuj swoje konto!" });
  }

  req.session.isLogged = true;
  req.session.user = user;

  res.status(200).json({ message: "Zalogowano" });
};

export const register = async (req: Request, res: Response) => {
  const isUserExists = await findUserByEmail(req.body.email);
  if (isUserExists) {
    return res.status(409).json({ message: "Konto już istnieje." });
  }

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      message: "Błędne dane.",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const token = crypto.randomBytes(16).toString("hex");

  const data = {
    name: req.body.name,
    email: req.body.email,
    address: `https://book-searcher-library.herokuapp.com/auth/activate/${token}`,
  };

  try {
    await sendMail(data);
    const user = await createUser(
      req.body.name,
      req.body.email,
      hashedPassword,
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

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.status(400).json({ message: err });
  });
};

export const checkLoginStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: "Status: zalogowany." });
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

export const getUserInfo = async (req: Request, res: Response) => {
  const data = Object.fromEntries(
    Object.entries(req.session.user!).filter((item) => item[0] !== "password"),
  );
  res.status(200).json(data);
};

export const modifyUserInfo = async (req: Request, res: Response) => {
  const user = await findUserByEmail(req.body.email);
  if (user && req.session.user!.id !== user.id) {
    return res.status(400).json({ message: "Nieprawidłowe dane." });
  }

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    req.session.user!.password,
  );
  if (!validPassword) {
    return res.status(401).json({ message: "Nieprawidłowe aktualne hasło." });
  }

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

  res.status(200).json(
    await updateUserInfo({
      id: req.session.user!.id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    }),
  );
};

export const addBookToUserBooks = async (req: Request, res: Response) => {
  const isBookInLibrary = await fetchUserBook(
    req.session.user!.id,
    Number(req.body.id),
  );

  if (isBookInLibrary) {
    return res
      .status(409)
      .json({ message: "Już masz tę pozycję w bibliotece." });
  }

  await addBookToUserLibrary(req.session.user!.id, Number(req.body.id));

  res.status(201).json({ message: "Zapisano książkę!" });
};

export const deleteBookFromUserBooks = async (req: Request, res: Response) => {
  const isBookInLibrary = await fetchUserBook(
    req.session.user!.id,
    Number(req.params.id),
  );

  if (!isBookInLibrary) {
    return res.status(404).json({ message: "Nie odnaleziono pozycji. " });
  }

  await deleteBookFromUserLibrary(req.session.user!.id, Number(req.params.id));

  res.status(200).json({ message: "Usunięto książkę z biblioteki!" });
};

export const getUserBook = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(await fetchUserBook(req.session.user!.id, Number(req.params.id)));
};

export const getUserBooks = async (req: Request, res: Response) => {
  res.status(200).json(await fetchUserLibrary(req.session.user!.id));
};
