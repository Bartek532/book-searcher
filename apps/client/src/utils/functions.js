"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.isInViewport = exports.buildAdvancedQuery = exports.getKeyByValue = exports.prepareQueryToSearch = void 0;
const prepareQueryToSearch = (query) => {
    return encodeURIComponent(query.trim());
};
exports.prepareQueryToSearch = prepareQueryToSearch;
const getKeyByValue = (value, object) => {
    for (const prop in object) {
        if (object[prop] === value)
            return prop;
    }
};
exports.getKeyByValue = getKeyByValue;
const buildAdvancedQuery = (tags, author, name) => {
    return `tags=${tags.join("+")}${name ? "&name=" + exports.prepareQueryToSearch(name) : ""}${author ? "&author=" + exports.prepareQueryToSearch(author) : ""}`;
};
exports.buildAdvancedQuery = buildAdvancedQuery;
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth));
};
exports.isInViewport = isInViewport;
const capitalize = (val) => {
    return val.slice(0, 1).toUpperCase() + val.slice(1);
};
exports.capitalize = capitalize;
