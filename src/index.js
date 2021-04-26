/** @module utility */
const _ = exports;

_.constants = require('./constants');
_.errors = require('./errors');
_.pattern = require('./pattern');
_.is = require('./is');
_.assert = require('./assert');
_.create = require('./create');
_.create = require('./create');
_.audit = require('./audit');
_.prop = require('./prop');

_.prop.lock.deep(exports);

/**
 * @see https://tools.ietf.org/html/rfc3987
 * @typedef {string} IRI
 */