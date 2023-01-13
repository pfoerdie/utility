/// <reference path="types.d.ts" />
const util = exports

util.constants = require('./constants')
util.errors = require('./errors')
util.pattern = require('./pattern')
util.is = require('./is')
util.assert = require('./assert')
util.create = require('./create')
util.generate = require('./generate')
util.audit = require('./audit')
util.prop = require('./prop')
util.method = require('./method')
util.time = require('./time')

util.prop.lock.deep(exports)
