"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const gsap_1 = __importStar(require("gsap"));
exports.default = () => {
    const tl = gsap_1.default.timeline();
    tl.from("#sun", {
        duration: 0.3,
        scale: 0,
        transformOrigin: "center center",
    })
        .addLabel("start")
        .from("#holes path", {
        duration: 0.4,
        scale: 0,
        transformOrigin: "center center",
        stagger: 0.15,
        ease: gsap_1.Power4.easeOut,
    }, "start")
        .from("#leafs g", {
        duration: 0.4,
        opacity: 0,
        y: -250,
        stagger: 0.15,
        ease: gsap_1.Power4.easeOut,
    }, "start")
        .from("#trees g", {
        duration: 0.4,
        scaleY: 0,
        transformOrigin: "50% 100%",
        ease: gsap_1.Power2.easeInOut,
        stagger: 0.1,
    }, "start")
        .from("#people g", {
        duration: 0.5,
        opacity: 0,
        x: 50,
        stagger: 0.15,
    })
        .fromTo("#hats path", {
        duration: 0.1,
        opacity: 0,
        rotate: "-45deg",
        x: -30,
    }, {
        rotate: 0,
        opacity: 1,
        x: 0,
        ease: gsap_1.Power3.easeOut,
    })
        .from(".not-found__label", {
        opacity: 0,
        duration: 0.4,
        y: -100,
        ease: gsap_1.Power3.easeIn,
    });
};
