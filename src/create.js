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

/**
 * @param {string} bnfDoc 
 * @returns {(value: string) => boolean}
 */
create.BNFValidator = function (bnfDoc) {
    throw new Error('not implemented'); // TODO
};