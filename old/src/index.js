/// <reference path="types.d.ts" />
const _ = exports;

_.constants = require('./constants');
_.errors = require('./errors');
_.pattern = require('./pattern');
_.is = require('./is');
_.assert = require('./assert');
_.create = require('./create');
_.generate = require('./generate');
_.audit = require('./audit');
_.prop = require('./prop');
_.method = require('./method');
_.time = require('./time');

_.prop.lock.deep(exports);