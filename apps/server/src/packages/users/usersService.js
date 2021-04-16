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
exports.updateUserInfo = exports.deleteBookFromUserLibrary = exports.addBookToUserLibrary = exports.fetchUserLibrary = exports.fetchUserBook = exports.addBookToLibrary = exports.addUserToken = exports.activateUser = exports.createUser = exports.findUserByToken = exports.findUserByEmail = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
exports.findUserByEmail = function (email) {
    return prisma.user.findFirst({
        where: { email: email },
        include: { UserToken: true }
    });
};
exports.findUserByToken = function (token) {
    return prisma.user.findFirst({
        where: { UserToken: { every: { token: token } } }
    });
};
exports.createUser = function (name, email, password) {
    return prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
};
exports.activateUser = function (id) {
    return prisma.user.update({
        where: { id: id },
        data: { isActive: true }
    });
};
exports.addUserToken = function (userId, token) {
    return prisma.userToken.create({
        data: {
            userId: userId,
            token: token
        }
    });
};
exports.addBookToLibrary = function (userId, bookId) {
    return prisma.userBookLibrary.create({
        data: { bookId: bookId, userId: userId }
    });
};
exports.fetchUserBook = function (userId, bookId) {
    return prisma.userBookLibrary.findUnique({
        where: { bookId_userId: { bookId: bookId, userId: userId } }
    });
};
exports.fetchUserLibrary = function (id, lastFetchedBookId, perPage) { return __awaiter(void 0, void 0, void 0, function () {
    var user, books;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findUnique({
                    where: { id: id },
                    include: { UserBookLibrary: true }
                })];
            case 1:
                user = _a.sent();
                books = user.UserBookLibrary.map(function (item) { return item.bookId; });
                return [4 /*yield*/, prisma.book.findMany({
                        where: { AND: [{ id: { "in": books } }, { id: { gt: lastFetchedBookId } }] },
                        take: perPage,
                        include: { UserBookRate: true, BookTag: true }
                    })];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.addBookToUserLibrary = function (userId, bookId) {
    return prisma.userBookLibrary.create({
        data: { bookId: bookId, userId: userId }
    });
};
exports.deleteBookFromUserLibrary = function (userId, bookId) {
    return prisma.userBookLibrary["delete"]({
        where: { bookId_userId: { bookId: bookId, userId: userId } }
    });
};
exports.updateUserInfo = function (data) {
    return prisma.user.update({
        where: { id: data.id },
        data: data
    });
};
