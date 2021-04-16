"use strict";
exports.__esModule = true;
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.modifyUserSchema = exports.moveBookSchema = exports.bookSchema = exports.registerSchema = exports.loginSchema = void 0;
var yup = require("yup");
var data_1 = require("@book-searcher/data");
var passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.loginSchema = yup.object({
    email: yup
        .string()
        .email("Wprowadź poprawny email.")
        .required("Email jest wymagany."),
    password: yup
        .string()
        .matches(passwordRegex, "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.")
        .required("Hasło jest wymagane.")
});
exports.registerSchema = yup.object({
    name: yup.string().required("Nazwa użytkownika jest wymagana."),
    email: yup
        .string()
        .email("Wprowadź poprawny email.")
        .required("Email jest wymagany."),
    password: yup
        .string()
        .matches(passwordRegex, "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.")
        .required("Hasło jest wymagane."),
    confirmPassword: yup
        .string()
        .required("Powtórz swoje hasło.")
        .oneOf([yup.ref("password"), null], "Hasła się nie zgadzają.")
});
exports.bookSchema = yup.object({
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
        .oneOf(data_1.rooms, "Wybierz opcję spośród podanych.")
        .required("Wybierz pokój."),
    place: yup
        .mixed()
        .oneOf(Object.values(data_1.places).flat(Infinity), "Wybierz opcję spośród podanych.")
        .required("Wybierz miejsce."),
    rate: yup.number().integer().positive().min(1).max(6),
    tags: yup.array().of(yup.string()),
    series: yup.string().when("tags", {
        is: function (tags) { return tags === null || tags === void 0 ? void 0 : tags.includes("series"); },
        then: yup
            .string()
            .min(3, "Pole cykl musi zawierać conajmniej 3 znaki.")
            .required("Cykl jest wymagany.")
    })
});
exports.moveBookSchema = yup.object({
    room: yup
        .string()
        .oneOf(data_1.rooms, "Wybierz opcję spośród podanych.")
        .required("Wybierz pokój."),
    place: yup
        .mixed()
        .oneOf(Object.values(data_1.places).flat(Infinity), "Wybierz opcję spośród podanych.")
        .required("Wybierz miejsce.")
});
exports.modifyUserSchema = yup.object({
    name: yup.string().required("Nazwa użytkownika jest wymagana."),
    email: yup
        .string()
        .email("Wprowadź poprawny email.")
        .required("Email jest wymagany."),
    oldPassword: yup
        .string()
        .matches(passwordRegex, "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.")
        .required("Hasło jest wymagane."),
    newPassword: yup
        .string()
        .matches(passwordRegex, "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.")
        .required("Hasło jest wymagane."),
    confirmPassword: yup
        .string()
        .required("Powtórz swoje nowe hasło.")
        .oneOf([yup.ref("newPassword"), null], "Hasła się nie zgadzają.")
});
exports.forgotPasswordSchema = yup.object({
    email: yup
        .string()
        .email("Wprowadź poprawny email.")
        .required("Email jest wymagany.")
});
exports.resetPasswordSchema = yup.object({
    password: yup
        .string()
        .matches(passwordRegex, "Hasło musi zawierać dużą i małą literę, cyfrę, znak specjalny oraz mieć conajmniej 8 znaków.")
        .required("Hasło jest wymagane."),
    confirmPassword: yup
        .string()
        .required("Powtórz swoje nowe hasło.")
        .oneOf([yup.ref("password"), null], "Hasła się nie zgadzają.")
});
