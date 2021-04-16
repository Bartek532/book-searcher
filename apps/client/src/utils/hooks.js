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
exports.useUserPassword = exports.useUserBooks = exports.useRateBook = exports.useUserInfo = void 0;
var vue_1 = require("vue");
var fetcher_1 = require("./fetcher");
var vuex_1 = require("vuex");
exports.useUserInfo = function () {
    var state = vue_1.reactive({
        loading: false,
        error: "",
        user: {}
    });
    var load = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.loading)
                        return [2 /*return*/];
                    state.loading = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users", "GET")];
                case 2:
                    data = (_a.sent()).data;
                    state.user = data;
                    state.error = "";
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    state.error = e_1.message;
                    return [3 /*break*/, 5];
                case 4:
                    state.loading = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return __assign(__assign({}, vue_1.toRefs(state)), { load: load });
};
exports.useRateBook = function () {
    var store = vuex_1.useStore();
    var loading = vue_1.ref(false);
    var rateBook = function (bookId, rate) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (loading.value)
                        return [2 /*return*/];
                    loading.value = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/books/rate", "POST", { id: bookId, rate: rate })];
                case 2:
                    data = (_a.sent()).data;
                    store.dispatch("setModal", {
                        show: true,
                        type: "success",
                        message: data.message
                    });
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    store.dispatch("setModal", {
                        show: true,
                        type: "warning",
                        message: e_2.message
                    });
                    return [3 /*break*/, 5];
                case 4:
                    loading.value = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        loading: loading,
        rateBook: rateBook
    };
};
exports.useUserBooks = function () {
    var store = vuex_1.useStore();
    var state = vue_1.reactive({
        loading: false,
        error: "",
        book: {}
    });
    var getUserBook = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.loading)
                        return [2 /*return*/];
                    state.loading = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users/books/" + id, "GET")];
                case 2:
                    data = (_a.sent()).data;
                    state.error = "";
                    state.book = data;
                    return [3 /*break*/, 5];
                case 3:
                    e_3 = _a.sent();
                    state.error = e_3.message;
                    return [3 /*break*/, 5];
                case 4:
                    state.loading = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var addToUserBooks = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.loading)
                        return [2 /*return*/];
                    state.loading = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users/books", "POST", { id: id })];
                case 2:
                    data = (_a.sent()).data;
                    state.error = "";
                    store.dispatch("setModal", {
                        show: true,
                        type: "success",
                        message: data.message
                    });
                    return [3 /*break*/, 5];
                case 3:
                    e_4 = _a.sent();
                    state.error = e_4.message;
                    store.dispatch("setModal", {
                        show: true,
                        type: "warning",
                        message: e_4.message
                    });
                    return [3 /*break*/, 5];
                case 4:
                    state.loading = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var deleteFromUserBooks = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (state.loading)
                        return [2 /*return*/];
                    state.loading = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users/books/" + id, "DELETE")];
                case 2:
                    data = (_a.sent()).data;
                    state.error = "";
                    store.dispatch("setModal", {
                        show: true,
                        type: "success",
                        message: data.message
                    });
                    return [3 /*break*/, 5];
                case 3:
                    e_5 = _a.sent();
                    state.error = e_5.message;
                    store.dispatch("setModal", {
                        show: true,
                        type: "warning",
                        message: e_5.message
                    });
                    return [3 /*break*/, 5];
                case 4:
                    state.loading = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return __assign(__assign({}, vue_1.toRefs(state)), { addToUserBooks: addToUserBooks,
        getUserBook: getUserBook,
        deleteFromUserBooks: deleteFromUserBooks });
};
exports.useUserPassword = function () {
    var store = vuex_1.useStore();
    var loading = vue_1.ref(false);
    var sendResetEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var data, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (loading.value)
                        return [2 /*return*/];
                    loading.value = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users/passwordReset", "POST", { email: email })];
                case 2:
                    data = (_a.sent()).data;
                    store.dispatch("setModal", {
                        show: true,
                        type: "success",
                        message: data.message
                    });
                    return [3 /*break*/, 5];
                case 3:
                    e_6 = _a.sent();
                    store.dispatch("setModal", {
                        show: true,
                        type: "warning",
                        message: e_6.message
                    });
                    return [3 /*break*/, 5];
                case 4:
                    loading.value = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var resetPassword = function (token, password, confirmPassword) { return __awaiter(void 0, void 0, void 0, function () {
        var e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, fetcher_1.fetcher("/api/users/passwordReset", "PUT", {
                            token: token,
                            password: password,
                            confirmPassword: confirmPassword
                        })];
                case 1:
                    _a.sent();
                    store.dispatch("setModal", {
                        show: true,
                        type: "success",
                        message: "Pomyślnie zmieniono hasło. Zaloguj się!"
                    });
                    return [3 /*break*/, 4];
                case 2:
                    e_7 = _a.sent();
                    store.dispatch("setModal", {
                        show: true,
                        type: "warning",
                        message: e_7.message
                    });
                    return [3 /*break*/, 4];
                case 3:
                    loading.value = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return {
        loading: loading,
        sendResetEmail: sendResetEmail,
        resetPassword: resetPassword
    };
};
