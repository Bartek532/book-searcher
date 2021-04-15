"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = __importDefault(require("gsap"));
exports.default = () => {
    const tl = gsap_1.default.timeline();
    tl.from(".logo", 0.3, {
        opacity: 0,
        y: -50,
    })
        .addLabel("logo")
        .from(".name", 0.3, {
        opacity: 0,
        x: 50,
    })
        .from(".subname", 0.3, {
        opacity: 0,
        x: -50,
    }, "logo")
        .from(".search", 0.3, {
        opacity: 0,
        y: 50,
    });
};
