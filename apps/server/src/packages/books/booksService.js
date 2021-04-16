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
exports.insertBook = exports.changeBookPosition = exports.updateBookRates = exports.getBookByUserRate = exports.advancedFetchBooks = exports.fetchBooksByFilters = exports.fetchBooksByQuery = exports.fetchBook = exports.fetchBooks = void 0;
var cloudinary_1 = require("cloudinary");
var client_1 = require("@prisma/client");
var data_1 = require("@book-searcher/data");
var prisma = new client_1.PrismaClient();
exports.fetchBooks = function (lastFetchedBookId, perPage) {
    return prisma.book.findMany({
        where: { id: { gt: lastFetchedBookId } },
        include: { UserBookRate: true, BookTag: true },
        take: perPage
    });
};
exports.fetchBook = function (slug) {
    return prisma.book.findFirst({
        where: {
            slug: slug
        },
        include: { UserBookRate: true, BookTag: true },
        orderBy: { place: "asc" }
    });
};
exports.fetchBooksByQuery = function (query, lastFetchedBookId, perPage) {
    return prisma.book.findMany({
        where: {
            id: { gt: lastFetchedBookId },
            OR: [
                {
                    name: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    author: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    series: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
            ]
        },
        include: { UserBookRate: true, BookTag: true },
        take: perPage
    });
};
exports.fetchBooksByFilters = function (filters, lastFetchedBookId, perPage) {
    return prisma.book.findMany({
        where: __assign(__assign({}, filters), { id: { gt: lastFetchedBookId } }),
        include: { UserBookRate: true, BookTag: true },
        take: perPage
    });
};
exports.advancedFetchBooks = function (query, lastFetchedBookId, perPage) {
    if (query.tags && query.tags.length) {
        return prisma.book.findMany({
            where: {
                AND: [
                    { id: { gt: lastFetchedBookId } },
                    { BookTag: { some: { tagName: { "in": query.tags } } } },
                    {
                        AND: [
                            { name: { contains: query.name || "", mode: "insensitive" } },
                            { author: { contains: query.author || "", mode: "insensitive" } },
                        ]
                    },
                ]
            },
            include: { UserBookRate: true, BookTag: true },
            take: perPage
        });
    }
    return prisma.book.findMany({
        where: {
            AND: [
                { id: { gt: lastFetchedBookId } },
                { name: { contains: query.name || "", mode: "insensitive" } },
                { author: { contains: query.author || "", mode: "insensitive" } },
            ]
        },
        include: { UserBookRate: true, BookTag: true },
        take: perPage
    });
};
exports.getBookByUserRate = function (userId, bookId) {
    return prisma.userBookRate.findUnique({
        where: { bookId_userId: { userId: userId, bookId: bookId } }
    });
};
exports.updateBookRates = function (userId, bookId, rate) { return __awaiter(void 0, void 0, void 0, function () {
    var ratedBook;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.userBookRate.findUnique({
                    where: { bookId_userId: { userId: userId, bookId: bookId } }
                })];
            case 1:
                ratedBook = _a.sent();
                if (ratedBook) {
                    return [2 /*return*/, prisma.userBookRate.update({
                            where: { bookId_userId: { userId: userId, bookId: bookId } },
                            data: {
                                rate: rate,
                                bookId: bookId,
                                userId: userId
                            }
                        })];
                }
                return [2 /*return*/, prisma.userBookRate.create({
                        data: {
                            rate: rate,
                            bookId: bookId,
                            userId: userId
                        }
                    })];
        }
    });
}); };
exports.changeBookPosition = function (_a) {
    var id = _a.id, place = _a.place, room = _a.room;
    return prisma.book.update({
        where: { id: id },
        data: { room: room, place: place }
    });
};
exports.insertBook = function (data, img, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var uploadedFile, book, tags, filteredTags, _i, filteredTags_1, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cloudinary_1["default"].v2.uploader.upload(img.path, {
                    folder: "book_searcher",
                    public_id: data.slug,
                    use_filename: true
                })];
            case 1:
                uploadedFile = _a.sent();
                return [4 /*yield*/, prisma.book.create({
                        data: {
                            name: data.name,
                            author: data.author,
                            place: data.place,
                            room: data.room,
                            slug: data.slug,
                            description: data.description,
                            series: data.series || "",
                            img: uploadedFile.secure_url
                        }
                    })];
            case 2:
                book = _a.sent();
                return [4 /*yield*/, prisma.userBookRate.create({
                        data: {
                            rate: data.rate,
                            bookId: book.id,
                            userId: userId
                        }
                    })];
            case 3:
                _a.sent();
                if (!data.tags) return [3 /*break*/, 7];
                tags = JSON.parse(data.tags);
                filteredTags = tags.filter(function (tag) { return data_1.tags.includes(tag); });
                if (!filteredTags.length) return [3 /*break*/, 7];
                _i = 0, filteredTags_1 = filteredTags;
                _a.label = 4;
            case 4:
                if (!(_i < filteredTags_1.length)) return [3 /*break*/, 7];
                tag = filteredTags_1[_i];
                return [4 /*yield*/, prisma.bookTag.create({
                        data: {
                            tagName: tag,
                            bookId: book.id
                        }
                    })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/, book];
        }
    });
}); };
