"use strict";
exports.__esModule = true;
exports.validateAuth = void 0;
exports.validateAuth = function (req, res, next) {
    if (req.session.isLogged) {
        next();
    }
    else {
        return res.status(409).json({ message: "Brak dostępu. Zaloguj się!" });
    }
};
