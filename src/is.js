const _ = require('.');

const is = module.exports = function (value) {
    return value !== void 0;
};

is.boolean = function (value) {
    return typeof value === 'boolean';
};

is.number = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

is.number.integer = function (value) {
    return is.number(value) && Number.isInteger(value);
};

is.number.finite = function (value) {
    return is.number(value) && value > -Infinity && value < Infinity;
};

is.string = function (value) {
    return typeof value === 'string';
};

is.string.nonempty = function (value) {
    return is.string(value) && _.pattern.nonempty.test(value);
};

is.string.IRI = function (value) {
    return is.string(value) && _.pattern.IRI.test(value);
};

is.symbol = function (value) {
    return typeof value === 'symbol';
};

is.function = function (value) {
    return typeof value === 'function';
};

is.object = function (value) {
    return value && typeof value === 'object';
};

is.object.nonempty = function (value) {
    return is.object(value) && Object.values(value).some(val => val);
};

is.object.JSON = function (value) {
    try {
        return is.object(value) && is.object(JSON.parse(JSON.stringify(value)));
    } catch (err) {
        return false;
    }
};

is.array = function (value) {
    return Array.isArray(value);
};

is.array.nonempty = function (value) {
    return is.array(value) && value.some(val => val)
};

is.iterable = function (value) {
    return is.object(value) && is.function(value[Symbol.iterator]);
};

is.date = function (value) {
    return value instanceof Date && is.number(value.getTime());
};