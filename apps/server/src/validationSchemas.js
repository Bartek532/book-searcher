"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.validationSchemas = exports.passwordRegex = void 0;
var joi_1 = require("joi");
var data_1 = require("@book-searcher/data");
exports.passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.validationSchemas = {
    login: joi_1["default"].object({
        email: joi_1["default"].string().min(6).required().email(),
        password: joi_1["default"].string().min(8).required()
    }),
    register: joi_1["default"].object({
        name: joi_1["default"].string().min(3).required(),
        email: joi_1["default"].string().min(6).required().email(),
        password: joi_1["default"].string().min(8).required(),
        confirmPassword: joi_1["default"].string().min(8).required().valid(joi_1["default"].ref("password"))
    }),
    modifyUser: joi_1["default"].object({
        name: joi_1["default"].string().min(3).required(),
        email: joi_1["default"].string().min(6).required().email(),
        newPassword: joi_1["default"].string().min(8).required(),
        oldPassword: joi_1["default"].string().min(8).required(),
        confirmPassword: joi_1["default"].string()
            .min(8)
            .required()
            .valid(joi_1["default"].ref("newPassword"))
    }),
    book: joi_1["default"].object({
        room: (_a = joi_1["default"].string()
            .required())
            .valid.apply(_a, data_1.rooms),
        place: (_b = joi_1["default"].string()
            .required())
            .valid.apply(_b, Object.values(data_1.places).flat(Infinity)),
        tags: joi_1["default"].string(),
        rate: joi_1["default"].number().integer().min(1).max(6).required(),
        name: joi_1["default"].string().min(3).required(),
        author: joi_1["default"].string().min(3).required(),
        description: joi_1["default"].string().min(10).required(),
        series: joi_1["default"].string().allow(null, "")
    }).strict(),
    bookPosition: joi_1["default"].object({
        id: joi_1["default"].number().required().integer(),
        room: (_c = joi_1["default"].string()
            .required())
            .valid.apply(_c, data_1.rooms),
        place: (_d = joi_1["default"].string()
            .required())
            .valid.apply(_d, Object.values(data_1.places).flat(Infinity))
    }).strict(),
    rate: joi_1["default"].object({
        id: joi_1["default"].number().integer().required(),
        rate: joi_1["default"].number().integer().min(1).max(6).required()
    }).strict(),
    forgotPassword: joi_1["default"].object({
        email: joi_1["default"].string().min(6).required().email()
    }),
    resetPassword: joi_1["default"].object({
        token: joi_1["default"].string().required(),
        password: joi_1["default"].string().min(8).required(),
        confirmPassword: joi_1["default"].string().min(8).required().valid(joi_1["default"].ref("password"))
    })
};
