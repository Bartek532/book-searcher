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
