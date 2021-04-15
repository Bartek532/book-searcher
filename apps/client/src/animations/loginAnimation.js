"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAnimation = void 0;
const gsap_1 = __importDefault(require("gsap"));
const tl = gsap_1.default.timeline({});
const loginAnimation = () => {
    if (window.innerWidth < 1000) {
        tl.from(".login__label", {
            duration: 0.7,
            opacity: 0,
        })
            .addLabel("form")
            .fromTo(".login__form", {
            duration: 0.5,
            opacity: 0,
            y: 200,
            ease: "ease-in",
        }, {
            opacity: 1,
            y: -80,
        })
            .to(".login__label", {
            duration: 0.5,
            y: -100,
        }, "form");
    }
    else {
        tl.fromTo(".login__label", {
            duration: 0.5,
            x: -150,
            y: -70,
            opacity: 0,
        }, {
            y: -70,
            opacity: 1,
            x: 0,
        }).fromTo(".login__form", {
            duration: 0.5,
            opacity: 0,
            y: 100,
        }, {
            opacity: 1,
            y: -50,
            ease: "ease-in",
        });
    }
};
exports.loginAnimation = loginAnimation;
