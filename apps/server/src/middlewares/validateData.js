"use strict";
exports.__esModule = true;
exports.validateData = exports.validateFilters = void 0;
exports.validateFilters = function (query) {
    var availableFilters = [
        "id",
        "name",
        "author",
        "slug",
        "room",
        "place",
        "series"
    ];
    return Object.fromEntries(Object.entries(query).filter(function (item) { return availableFilters.includes(item[0]); }).map(function (item) {
        if (item[0] === "id") {
            return ["id", Number(item[1])];
        }
        return item;
    }));
};
exports.validateData = function (schema) { return function (req, res, next) {
    var error = schema.validate(req.body).error;
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}; };
