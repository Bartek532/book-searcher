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
var _a;
exports.__esModule = true;
var vuex_1 = require("vuex");
var mutation_types_1 = require("./mutation-types");
var fetcher_1 = require("../utils/fetcher");
var store = vuex_1.createStore({
    state: {
        loadingBooks: false,
        loading: false,
        results: [],
        lastBookApiCallAddress: "",
        error: "",
        isLogIn: false,
        modal: {
            show: false,
            type: "warning",
            message: ""
        }
    },
    mutations: (_a = {},
        _a[mutation_types_1.types.SET_LOADING_BOOKS_STATUS] = function (state, value) {
            state.loadingBooks = value;
        },
        _a[mutation_types_1.types.SET_LOADING_STATUS] = function (state, value) {
            state.loading = value;
        },
        _a[mutation_types_1.types.UPDATE_RESULTS] = function (state, value) {
            state.results = value;
        },
        _a[mutation_types_1.types.SET_ERRORS] = function (state, value) {
            state.error = value;
        },
        _a[mutation_types_1.types.SET_LOGIN_STATUS] = function (state, value) {
            state.isLogIn = value;
        },
        _a[mutation_types_1.types.SET_LAST_API_ADDRESS] = function (state, url) {
            state.lastBookApiCallAddress = url;
        },
        _a[mutation_types_1.types.SET_MODAL_STATUS] = function (state, data) {
            state.modal.show = data.show;
            state.modal.type = data.type;
            if (data.message)
                state.modal.message = data.message;
        },
        _a),
    actions: {
        searchBooks: function (_a, url) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var data, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/books" + url, "GET")];
                        case 2:
                            data = (_b.sent()).data;
                            commit(mutation_types_1.types.UPDATE_RESULTS, data);
                            commit(mutation_types_1.types.SET_LAST_API_ADDRESS, url);
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _b.sent();
                            console.error(err_1);
                            commit(mutation_types_1.types.SET_ERRORS, err_1);
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        createBook: function (_a, book) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/books", "POST", book)];
                        case 2:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "success",
                                message: "Dodano książkę!"
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            err_2 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_2.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_2.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        moveBook: function (_a, data) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/books", "PUT", data)];
                        case 2:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "success",
                                message: "Zmieniono położenie książki!"
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            err_3 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_3.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_3.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        setModal: function (_a, data) {
            var commit = _a.commit;
            commit(mutation_types_1.types.SET_MODAL_STATUS, data);
        },
        login: function (_a, loginData) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/users/session", "POST", loginData)];
                        case 2:
                            _b.sent();
                            commit(mutation_types_1.types.SET_LOGIN_STATUS, true);
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            return [3 /*break*/, 5];
                        case 3:
                            err_4 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_4.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_4.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        register: function (_a, registerData) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/users", "POST", registerData)];
                        case 2:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "success",
                                message: "Wysłano email z linkiem aktywacyjnym. Zaloguj się!"
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            err_5 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_5.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_5.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        logout: function (_a) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/users/session", "DELETE")];
                        case 1:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_LOGIN_STATUS, false);
                            return [3 /*break*/, 3];
                        case 2:
                            err_6 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_6.message);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        isLoggedIn: function (_a) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/users/session/me", "GET")];
                        case 1:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_LOGIN_STATUS, true);
                            return [3 /*break*/, 3];
                        case 2:
                            err_7 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_7);
                            commit(mutation_types_1.types.SET_LOGIN_STATUS, false);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        modifyUserData: function (_a, data) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var err_8;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher("/api/users", "PUT", data)];
                        case 2:
                            _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "success",
                                message: "Zmieniono dane użytkownika."
                            });
                            return [3 /*break*/, 5];
                        case 3:
                            err_8 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_8.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_8.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        getUserBooks: function (_a) {
            var commit = _a.commit;
            return __awaiter(this, void 0, void 0, function () {
                var url, data, err_9;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, true);
                            url = "/api/users/books";
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4 /*yield*/, fetcher_1.fetcher(url, "GET")];
                        case 2:
                            data = (_b.sent()).data;
                            commit(mutation_types_1.types.UPDATE_RESULTS, data);
                            commit(mutation_types_1.types.SET_LAST_API_ADDRESS, url);
                            commit(mutation_types_1.types.SET_ERRORS, "");
                            return [3 /*break*/, 5];
                        case 3:
                            err_9 = _b.sent();
                            commit(mutation_types_1.types.SET_ERRORS, err_9.message);
                            commit(mutation_types_1.types.SET_MODAL_STATUS, {
                                show: true,
                                type: "warning",
                                message: err_9.message
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
    }
});
exports["default"] = store;
