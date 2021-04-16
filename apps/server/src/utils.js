"use strict";
exports.__esModule = true;
exports.createBookSlug = void 0;
var slugx_1 = require("slugx");
exports.createBookSlug = function (title, author) {
    var authorSurname = author.substring(author.lastIndexOf(" ") + 1 || 0);
    return slugx_1["default"].create(title + " " + authorSurname);
};
