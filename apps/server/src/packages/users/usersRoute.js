"use strict";
exports.__esModule = true;
exports.usersRoute = void 0;
var express_1 = require("express");
var usersController_1 = require("./usersController");
var errors_1 = require("../../middlewares/errors");
var validateData_1 = require("../../middlewares/validateData");
var validateAuth_1 = require("../../middlewares/validateAuth");
var validationSchemas_1 = require("../../validationSchemas");
var router = express_1["default"].Router();
router.post("/session", validateData_1.validateData(validationSchemas_1.validationSchemas.login), errors_1.catchAsync(usersController_1.login));
router.post("/", validateData_1.validateData(validationSchemas_1.validationSchemas.register), errors_1.catchAsync(usersController_1.register));
router["delete"]("/session", usersController_1.logout);
router.get("/session/me", validateAuth_1.validateAuth, usersController_1.checkLoginStatus);
router.post("/activate", errors_1.catchAsync(usersController_1.activateAccount));
router.get("/", validateAuth_1.validateAuth, errors_1.catchAsync(usersController_1.getUserInfo));
router.put("/", validateAuth_1.validateAuth, validateData_1.validateData(validationSchemas_1.validationSchemas.modifyUser), errors_1.catchAsync(usersController_1.modifyUserInfo));
router.post("/passwordReset", validateData_1.validateData(validationSchemas_1.validationSchemas.forgotPassword), errors_1.catchAsync(usersController_1.sendResetEmail));
router.put("/passwordReset", validateData_1.validateData(validationSchemas_1.validationSchemas.resetPassword), errors_1.catchAsync(usersController_1.resetUserPassword));
router.get("/books", validateAuth_1.validateAuth, errors_1.catchAsync(usersController_1.getUserBooks));
router.get("/books/:id", validateAuth_1.validateAuth, errors_1.catchAsync(usersController_1.getUserBook));
router.post("/books", validateAuth_1.validateAuth, errors_1.catchAsync(usersController_1.addBookToUserBooks));
router["delete"]("/books/:id", validateAuth_1.validateAuth, errors_1.catchAsync(usersController_1.deleteBookFromUserBooks));
exports.usersRoute = router;
