"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const fetcher = async (path, method, data) => {
    try {
        return await axios_1.default({
            url: path,
            method,
            responseType: "json",
            headers: { "content-type": "application/json" },
            withCredentials: true,
            data: data || {},
        });
    }
    catch (err) {
        console.log(err);
        throw new Error(err.response?.data?.message);
    }
};
exports.fetcher = fetcher;
