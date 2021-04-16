"use strict";
exports.__esModule = true;
exports.catchErrors = exports.catchAsync = exports.notFound = void 0;
var httpException_1 = require("../exceptions/httpException");
function notFound(req, res, next) {
    var err = new httpException_1["default"](404, "Oops! Błąd!");
    next(err);
}
exports.notFound = notFound;
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next)["catch"](function (err) { return next(err); });
    };
}
exports.catchAsync = catchAsync;
function catchErrors(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message || "Oops! Błąd!" });
    console.log(err);
}
exports.catchErrors = catchErrors;
