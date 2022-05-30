const _ = require('.');

const create = exports;

/**
 * @param {RegExp} pattern 
 * @returns {(value: string) => boolean}
 */
create.StringValidator = function (pattern) {
    return function (value) {
        return _.is.string(value) && pattern.test(value);
    };
};

/**
 * @param {(value: any) => boolean} checkFn 
 * @returns {(value: Array) => boolean}
 */
create.ArrayValidator = function (checkFn) {
    return function (value) {
        return _.is.array(value) && value.every(checkFn);
    };
};

create.CombinedValidator = Object.create(null);

create.CombinedValidator.AND = function (...checkFns) {
    return function (value) {
        return checkFns.every(checkFn => checkFn(value));
    };
};

create.CombinedValidator.OR = function (...checkFns) {
    return function (value) {
        return checkFns.some(checkFn => checkFn(value));
    };
};

create.CombinedValidator.XOR = function (...checkFns) {
    return function (value) {
        return checkFns.filter(checkFn => checkFn(value)).length === 1;
    };
};