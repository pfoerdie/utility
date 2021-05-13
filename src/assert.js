const _ = require('.');

/**
 * @param {any} value 
 * @param {string} [errMsg=''] 
 * @param {function} [errType=Error] 
 * @throws {errType}
 * @returns {assert}
 */
const assert = module.exports = function (value, errMsg = '', errType = Error) {
    if (!value) throwErr(assert, errType, errMsg);
    return assert;
};

/**
 * @param {undefined|null|NaN|0|''} value 
 * @param {string} [errMsg=''] 
 * @param {function} [errType=Error] 
 * @throws {errType}
 * @returns {assert}
 */
assert.not = function (value, errMsg = '', errType = Error) {
    if (value) throwErr(assert.not, errType, errMsg);
    return assert;
};

/**
 * @param {any} value 
 * @param {any} other 
 * @throws {Error}
 * @returns {assert}
 */
assert.equal = function (value, other) {
    if (value !== other) throwErr(assert.equal, Error, 'expected to be equal');
    return assert;
};

/**
 * @param {any} value 
 * @param {any} other 
 * @throws {Error}
 * @returns {assert}
 */
assert.not.equal = function (value, other) {
    if (value === other) throwErr(assert.not.equal, Error, 'expected not to be equal');
    return assert;
};

/**
 * @param {number} value 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.boolean = function (value) {
    if (!_.is.boolean(value)) throwErr(assert.number, TypeError, 'expected to be a boolean');
    return assert;
};

/**
 * @param {number} value 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.number = function (value, min = -Infinity, max = Infinity) {
    if (!_.is.number(value)) throwErr(assert.number, TypeError, 'expected to be a number');
    if (value < min) throwErr(assert.number, Error, 'expected to be at minimum ' + min);
    if (value > max) throwErr(assert.number, Error, 'expected to be at maximum ' + max);
    return assert;
};

/**
 * @param {number} value 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.number.integer = function (value, min = -Infinity, max = Infinity) {
    if (!_.is.number.integer(value)) throwErr(assert.number.integer, TypeError, 'expected to be an integer');
    if (value < min) throwErr(assert.number.integer, Error, 'expected to be at minimum ' + min);
    if (value > max) throwErr(assert.number.integer, Error, 'expected to be at maximum ' + max);
    return assert;
};

/**
 * @param {string} value 
 * @param {RegExp} [pattern] 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.string = function (value, pattern, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (!_.is.string(value)) throwErr(assert.string, TypeError, 'expected to be a string');
    if (pattern && !pattern.test(value)) throwErr(assert.string, Error, 'expected to match pattern ' + pattern);
    if (value.length < min) throwErr(assert.string, Error, 'expected to have minimum length of ' + min);
    if (value > max) throwErr(assert.string, Error, 'expected to have maximum length of ' + max);
    return assert;
};

/**
 * @param {function} value 
 * @throws {TypeError}
 * @returns {assert}
 */
assert.function = function (value) {
    if (!_.is.function(value)) throwErr(assert.function, TypeError, 'expected to be a function');
    return assert;
};

/**
 * @param {object} value 
 * @param {{[key: string]: (value: any, key: string|number) => boolean}} [checkObj] 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.object = function (value, checkObj) {
    if (!_.is.object(value)) throwErr(assert.object, TypeError, 'expected to be an object');
    if (checkObj) for (let [key, checkFn] of Object.entries(checkObj))
        if (!checkFn(value[key], key)) throwErr(assert.object, Error, 'expected entry "' + key + '" is invalid');
    return assert;
};

/**
 * @param {object} value 
 * @param {...function} classFns 
 * @throws {TypeError}
 * @returns {assert}
 */
assert.instance = function (value, ...classFns) {
    if (!classFns.some(classFn => value instanceof classFn)) throwErr(
        assert.instance, TypeError,
        'expected to be instance of ' + classFns.map(classFn => classFn.name).join(' or ')
    );
    return assert;
};

/**
 * @param {object} value 
 * @param {...function} classFns 
 * @throws {TypeError}
 * @returns {assert}
 */
assert.not.instance = function (value, ...classFns) {
    if (classFns.some(classFn => value instanceof classFn)) throwErr(
        assert.instance, TypeError,
        'expected not to be instance of ' + classFns.map(classFn => classFn.name).join(' or ')
    );
    return assert;
};

/**
 * @param {Array} value 
 * @param {(value: any, index: number) => boolean} [checkFn] 
 * @param {number} [min] 
 * @param {number} [max] 
 * @throws {TypeError|Error}
 * @returns {assert}
 */
assert.array = function (value, checkFn, min = 0, max = Number.MAX_SAFE_INTEGER) {
    if (!_.is.array(value)) throwErr(assert.array, TypeError, 'expected to be an array');
    if (checkFn) for (let i = 0; i < value.length; i++)
        if (!checkFn(value[i], i)) throwErr(assert.array, Error, 'expected entry [' + i + '] is invalid');
    if (value.length < min) throwErr(assert.array, Error, 'expected to have minimum length of ' + min);
    if (value > max) throwErr(assert.array, Error, 'expected to have maximum length of ' + max);
    return assert;
};

/**
 * @param {function} source 
 * @param {function} errType 
 * @param {...any} args 
 * @throws {errType}
 */
function throwErr(source, errType, ...args) {
    const err = new errType(...args);
    Error.captureStackTrace(err, source);
    throw err;
}