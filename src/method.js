const _ = require('.');

const method = exports;

/**
 * @param {function(...any, (err: null|Error, result: any) => void): void} fn 
 * @param  {...any} args 
 * @returns {Promise<any>}
 */
method.promify = function (fn, ...args) {
    _.assert.function(fn);
    return new Promise((resolve, reject) => {
        args.push((err, result) => err ? reject(err) : resolve(result));
        fn.apply(this, args);
    });
};

/**
 * @param {function(...any, (err: null|Error, result: any) => void): void} fn 
 * @returns {function(...any): Promise<any>}
 */
method.promisify = function (fn) {
    _.assert.function(fn);
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push((err, result) => err ? reject(err) : resolve(result));
            fn.apply(this, args);
        });
    };
};