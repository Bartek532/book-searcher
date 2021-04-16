"use strict";
exports.__esModule = true;
exports.parseForm = void 0;
var formidable_1 = require("formidable");
exports.parseForm = function (req, res, next) {
    var form = new formidable_1["default"].IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        if (!Object.values(files).length) {
            return res.status(400).json({ message: "Nie dodano pliku. " });
        }
        res.locals.fields = fields;
        res.locals.files = files;
        next();
    });
};
