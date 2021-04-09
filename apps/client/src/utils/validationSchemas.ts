import * as yup from "yup";

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
  room: yup.string().required("Wybierz pokój."),
  place: yup.string().required("Wybierz miejsce."),
});
