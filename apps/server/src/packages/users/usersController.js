"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUserBooks = exports.getUserBook = exports.deleteBookFromUserBooks = exports.addBookToUserBooks = exports.modifyUserInfo = exports.getUserInfo = exports.resetUserPassword = exports.sendResetEmail = exports.activateAccount = exports.checkLoginStatus = exports.logout = exports.register = exports.login = void 0;
var bcrypt_1 = require("bcrypt");
var crypto_1 = require("crypto");
var usersService_1 = require("./usersService");
var validationSchemas_1 = require("../../validationSchemas");
var sendEmail_1 = require("../../middlewares/sendEmail");
var consts_1 = require("../../consts");
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, validPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByEmail(req.body.email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "Nieprawidłowy login lub hasło!" })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(req.body.password, user.password)];
            case 2:
                validPassword = _a.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(404).json({ message: "Nieprawidłowy login lub hasło!" })];
                }
                if (!user.isActive) {
                    return [2 /*return*/, res.status(400).json({ message: "Aktywuj swoje konto!" })];
                }
                req.session.isLogged = true;
                req.session.user = user;
                res.status(200).json({ message: "Zalogowano" });
                return [2 /*return*/];
        }
    });
}); };
exports.register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isUserExists, hashedPassword, token, data, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByEmail(req.body.email)];
            case 1:
                isUserExists = _a.sent();
                if (isUserExists) {
                    return [2 /*return*/, res.status(409).json({ message: "Konto już istnieje." })];
                }
                if (!validationSchemas_1.passwordRegex.test(req.body.password)) {
                    return [2 /*return*/, res.status(400).json({
                            message: "Błędne dane."
                        })];
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, 10)];
            case 2:
                hashedPassword = _a.sent();
                token = crypto_1["default"].randomBytes(16).toString("hex");
                data = {
                    email: req.body.email,
                    subject: consts_1.mailOptions.activate.subject,
                    html: consts_1.mailOptions.activate.html(req.body.name, token)
                };
                _a.label = 3;
            case 3:
                _a.trys.push([3, 7, , 8]);
                return [4 /*yield*/, sendEmail_1.sendMail(data)];
            case 4:
                _a.sent();
                return [4 /*yield*/, usersService_1.createUser(req.body.name, req.body.email, hashedPassword)];
            case 5:
                user = _a.sent();
                return [4 /*yield*/, usersService_1.addUserToken(user.id, token)];
            case 6:
                _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 7:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res
                        .status(400)
                        .json({ message: "Oops, coś poszło nie tak, spróbuj ponownie." })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.status(400).json({ message: err });
    });
};
exports.checkLoginStatus = function (req, res) {
    res.status(200).json({ message: "Status: zalogowany." });
};
exports.activateAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByToken(req.body.token)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "Nie znaleziono użytkownika. " })];
                }
                if (user.isActive) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Twoje konto zostało już aktywowane, zaloguj się!" })];
                }
                return [4 /*yield*/, usersService_1.activateUser(user.id)];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Twoje konto zostało aktywowane!" });
                return [2 /*return*/];
        }
    });
}); };
exports.sendResetEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByEmail(req.body.email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "Błąd. Spróbuj ponownie poźniej." })];
                }
                data = {
                    email: req.body.email,
                    subject: consts_1.mailOptions.resetPassword.subject,
                    html: consts_1.mailOptions.resetPassword.html(user.name, user.UserToken[0].token)
                };
                return [4 /*yield*/, sendEmail_1.sendMail(data)];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Wysłano link do resetowania hasła!" });
                return [2 /*return*/];
        }
    });
}); };
exports.resetUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, hashedPassword, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByToken(req.body.token)];
            case 1:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: "Błąd. Spróbuj ponownie poźniej." })];
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, 10)];
            case 2:
                hashedPassword = _c.sent();
                _b = (_a = res
                    .status(200))
                    .json;
                return [4 /*yield*/, usersService_1.updateUserInfo({ id: user.id, password: hashedPassword })];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        data = Object.fromEntries(Object.entries(req.session.user).filter(function (item) { return item[0] !== "password"; }));
        res.status(200).json(data);
        return [2 /*return*/];
    });
}); };
exports.modifyUserInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, validPassword, hashedPassword, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, usersService_1.findUserByEmail(req.body.email)];
            case 1:
                user = _c.sent();
                if (user && req.session.user.id !== user.id) {
                    return [2 /*return*/, res.status(400).json({ message: "Nieprawidłowe dane." })];
                }
                return [4 /*yield*/, bcrypt_1["default"].compare(req.body.oldPassword, req.session.user.password)];
            case 2:
                validPassword = _c.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(401).json({ message: "Nieprawidłowe aktualne hasło." })];
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.newPassword, 10)];
            case 3:
                hashedPassword = _c.sent();
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, usersService_1.updateUserInfo({
                        id: req.session.user.id,
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword
                    })];
            case 4:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.addBookToUserBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isBookInLibrary;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.fetchUserBook(req.session.user.id, Number(req.body.id))];
            case 1:
                isBookInLibrary = _a.sent();
                if (isBookInLibrary) {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "Już masz tę pozycję w bibliotece." })];
                }
                return [4 /*yield*/, usersService_1.addBookToUserLibrary(req.session.user.id, Number(req.body.id))];
            case 2:
                _a.sent();
                res.status(201).json({ message: "Zapisano książkę!" });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBookFromUserBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isBookInLibrary;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, usersService_1.fetchUserBook(req.session.user.id, Number(req.params.id))];
            case 1:
                isBookInLibrary = _a.sent();
                if (!isBookInLibrary) {
                    return [2 /*return*/, res.status(404).json({ message: "Nie odnaleziono pozycji. " })];
                }
                return [4 /*yield*/, usersService_1.deleteBookFromUserLibrary(req.session.user.id, Number(req.params.id))];
            case 2:
                _a.sent();
                res.status(200).json({ message: "Usunięto książkę z biblioteki!" });
                return [2 /*return*/];
        }
    });
}); };
exports.getUserBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res
                    .status(200))
                    .json;
                return [4 /*yield*/, usersService_1.fetchUserBook(req.session.user.id, Number(req.params.id))];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.getUserBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lastReturnedBookId, perPage, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                lastReturnedBookId = Number(req.query.lastId) || 0;
                perPage = Number(req.query.perPage) || 30;
                _b = (_a = res
                    .status(200))
                    .json;
                return [4 /*yield*/, usersService_1.fetchUserLibrary(req.session.user.id, lastReturnedBookId, perPage)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
