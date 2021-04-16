"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createBook = exports.rateBook = exports.moveBook = exports.searchBooks = exports.getBook = exports.getAllBooks = void 0;
var booksService_1 = require("./booksService");
var validateData_1 = require("../../middlewares/validateData");
var utils_1 = require("../../utils");
var validationSchemas_1 = require("../../validationSchemas");
exports.getAllBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lastReturnedBookId, perPage, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                lastReturnedBookId = Number(req.query.lastId) || 0;
                perPage = Number(req.query.perPage) || 30;
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, booksService_1.fetchBooks(lastReturnedBookId, perPage)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.getBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, booksService_1.fetchBook(req.params.slug)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.searchBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lastReturnedBookId, perPage, data, filters, data, query, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                lastReturnedBookId = Number(req.query.lastId) || 0;
                perPage = Number(req.query.perPage) || 30;
                if (!(req.query.type === "basic")) return [3 /*break*/, 5];
                if (!req.query.q) return [3 /*break*/, 2];
                return [4 /*yield*/, booksService_1.fetchBooksByQuery(req.query.q, lastReturnedBookId, perPage)];
            case 1:
                data = _c.sent();
                return [2 /*return*/, res.status(200).json(data)];
            case 2:
                filters = validateData_1.validateFilters(req.query);
                if (!Object.keys(filters).length) return [3 /*break*/, 4];
                return [4 /*yield*/, booksService_1.fetchBooksByFilters(filters, lastReturnedBookId, perPage)];
            case 3:
                data = _c.sent();
                return [2 /*return*/, res.status(200).json(data)];
            case 4: return [2 /*return*/, res
                    .status(200)
                    .json({ message: "Nieprawidłowe filtry wyszukiwania." })];
            case 5:
                if (!(req.query.type === "advanced")) return [3 /*break*/, 7];
                query = {
                    name: req.query.name,
                    author: req.query.author,
                    tags: req.query.tags ? req.query.tags.split(" ") : []
                };
                _b = (_a = res
                    .status(200))
                    .json;
                return [4 /*yield*/, booksService_1.advancedFetchBooks(query, lastReturnedBookId, perPage)];
            case 6: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 7: return [2 /*return*/, res.status(400).json({ message: "Nieprawidłowy typ wyszukiwania. " })];
        }
    });
}); };
exports.moveBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, booksService_1.changeBookPosition({
                        id: req.body.id,
                        place: req.body.place,
                        room: req.body.room
                    })];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.rateBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, booksService_1.updateBookRates(req.session.user.id, req.body.id, req.body.rate)];
            case 1:
                _a.sent();
                res.status(200).json({ message: "Dziękujemy za opinię!" });
                return [2 /*return*/];
        }
    });
}); };
exports.createBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, bookSlug, book, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                error = validationSchemas_1.validationSchemas.book.validate(__assign(__assign({}, res.locals.fields), { rate: Number(res.locals.fields.rate) })).error;
                if (error) {
                    return [2 /*return*/, res.status(400).json({ message: error.details[0].message })];
                }
                bookSlug = utils_1.createBookSlug(res.locals.fields.name, res.locals.fields.author);
                return [4 /*yield*/, booksService_1.fetchBook(bookSlug)];
            case 1:
                book = _c.sent();
                if (book) {
                    return [2 /*return*/, res.status(400).json({ message: "Książka już istnieje." })];
                }
                _b = (_a = res.status(200)).json;
                return [4 /*yield*/, booksService_1.insertBook(__assign(__assign({}, res.locals.fields), { slug: bookSlug, rate: Number(res.locals.fields.rate) }), res.locals.files.img, req.session.user.id)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
