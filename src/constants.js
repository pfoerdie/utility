const _ = require('.');
const constants = exports;

constants.NODE_ENV = process.env.NODE_ENV || '';
constants.PROD = (constants.NODE_ENV === 'production');
constants.TEST = ('describe' in global);

constants.PI = Math.PI;
constants.E = Math.E;
constants.EPSILON = Number.EPSILON;

constants.$$iterator = Symbol.iterator;
constants.$$species = Symbol.species;
constants.$$hasInstance = Symbol.hasInstance;