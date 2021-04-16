"use strict";
exports.__esModule = true;
exports.capitalize = exports.isInViewport = exports.buildAdvancedQuery = exports.getKeyByValue = exports.prepareQueryToSearch = void 0;
exports.prepareQueryToSearch = function (query) {
    return encodeURIComponent(query.trim());
};
exports.getKeyByValue = function (value, object) {
    for (var prop in object) {
        if (object[prop] === value)
            return prop;
    }
};
exports.buildAdvancedQuery = function (tags, author, name) {
    return "tags=" + tags.join("+") + (name ? "&name=" + exports.prepareQueryToSearch(name) : "") + (author ? "&author=" + exports.prepareQueryToSearch(author) : "");
};
exports.isInViewport = function (element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth));
};
exports.capitalize = function (val) {
    return val.slice(0, 1).toUpperCase() + val.slice(1);
};
