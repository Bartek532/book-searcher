import * as yup from "yup";
import { rooms, places } from "@book-searcher/data";

const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Wprowadź poprawny email.")
    .required("Email jest wymagany."),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.",
    )
    .required("Hasło jest wymagane."),
});

export const registerSchema = yup.object({
  name: yup.string().required("Nazwa użytkownika jest wymagana."),
  email: yup
    .string()
    .email("Wprowadź poprawny email.")
    .required("Email jest wymagany."),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.",
    )
    .required("Hasło jest wymagane."),
  confirmPassword: yup
    .string()
    .required("Powtórz swoje hasło.")
    .oneOf([yup.ref("password"), null], "Hasła się nie zgadzają."),
});

export const bookSchema = yup.object({
  name: yup
    .string()
    .min(3, "Pole tytuł musi zawierać conajmniej 3 znaki.")
    .required("Tytuł książki jest wymagany."),
  author: yup
    .string()
    .min(3, "Pole autor musi zawierać conajmniej 3 znaki.")
    .required("Autor książki jest wymagany."),
  description: yup
    .string()
    .min(10, "Opis musi zawierać conajmniej 10 znaków.")
    .required("Opis jest wymagany."),
  room: yup
    .string()
    .oneOf(rooms, "Wybierz opcję spośród podanych.")
    .required("Wybierz pokój."),
  place: yup
    .mixed()
    .oneOf(
      Object.values(places).flat(Infinity),
      "Wybierz opcję spośród podanych.",
    )
    .required("Wybierz miejsce."),
  rate: yup.number().integer().positive().min(1).max(6),
  tags: yup.array().of(yup.string()),
  series: yup.string().when("tags", {
    is: (tags: string[]) => tags?.includes("series"),
    then: yup
      .string()
      .min(3, "Pole cykl musi zawierać conajmniej 3 znaki.")
      .required("Cykl jest wymagany."),
  }),
});

export const moveBookSchema = yup.object({
  room: yup
    .string()
    .oneOf(rooms, "Wybierz opcję spośród podanych.")
    .required("Wybierz pokój."),
  place: yup
    .mixed()
    .oneOf(
      Object.values(places).flat(Infinity),
      "Wybierz opcję spośród podanych.",
    )
    .required("Wybierz miejsce."),
});

export const modifyUserSchema = yup.object({
  name: yup.string().required("Nazwa użytkownika jest wymagana."),
  email: yup
    .string()
    .email("Wprowadź poprawny email.")
    .required("Email jest wymagany."),
  oldPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.",
    )
    .required("Hasło jest wymagane."),
  newPassword: yup
    .string()
    .matches(
      passwordRegex,
      "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.",
    )
    .required("Hasło jest wymagane."),
  confirmPassword: yup
    .string()
    .required("Powtórz swoje nowe hasło.")
    .oneOf([yup.ref("newPassword"), null], "Hasła się nie zgadzają."),
});
