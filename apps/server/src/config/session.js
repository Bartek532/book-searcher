"use strict";
exports.__esModule = true;
exports.sessionConfig = void 0;
exports.sessionConfig = {
    name: "sessionId",
    secret: process.env.SECRET_SESSION,
    cookie: {
        secure: false,
        sameSite: "lax",
        httpOnly: true
    },
    resave: true,
    saveUninitialized: false
};
if (process.env.NODE_ENV === "production") {
    exports.sessionConfig.cookie.secure = true;
}
