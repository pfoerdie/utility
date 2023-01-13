const util = require('.')

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
const time = module.exports = function (value) {
  const date = _parseDate(value)
  return _stringifyTime(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.iso = function (value) {
  const date = _parseDate(value)
  return _stringifyTime(date) + _stringifyTimezone(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.utc = function (value) {
  const date = _parseDate(value)
  return _stringifyUtcTime(date) + 'Z'
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.date = function (value) {
  const date = _parseDate(value)
  return _stringifyDate(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.date.iso = function (value) {
  const date = _parseDate(value)
  return _stringifyDate(date) + _stringifyTimezone(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.date.utc = function (value) {
  const date = _parseDate(value)
  return _stringifyUtcDate(date) + 'Z'
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.datetime = function (value) {
  const date = _parseDate(value)
  return _stringifyDate(date) + 'T' + _stringifyTime(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.datetime.iso = function (value) {
  const date = _parseDate(value)
  return _stringifyDate(date) + 'T' + _stringifyTime(date) + _stringifyTimezone(date)
}

/**
 * @param {number|string|Date} [value]
 * @returns {string}
 */
time.datetime.utc = function (value) {
  const date = _parseDate(value)
  return _stringifyUtcDate(date) + 'T' + _stringifyUtcTime(date) + 'Z'
}

/**
 * @param {number|string|Date} [value]
 * @returns {Date}
 */
function _parseDate (value) {
  if (util.is.null(value)) return new Date()
  return new Date(value)
}

/**
 * @param {Date} date
 * @returns {string}
 */
function _stringifyTime (date) {
  const
    hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')
  const millisecond = date.getMilliseconds().toString()

  return hour + ':' + minute + ':' + second + '.' + millisecond
}

/**
 * @param {Date} date
 * @returns {string}
 */
function _stringifyUtcTime (date) {
  const
    hour = date.getUTCHours().toString().padStart(2, '0')
  const minute = date.getUTCMinutes().toString().padStart(2, '0')
  const second = date.getUTCSeconds().toString().padStart(2, '0')
  const millisecond = date.getUTCMilliseconds().toString()

  return hour + ':' + minute + ':' + second + '.' + millisecond
}

/**
 * @param {Date} date
 * @returns {string}
 */
function _stringifyDate (date) {
  const
    year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return year + '-' + month + '-' + day
}

/**
 * @param {Date} date
 * @returns {string}
 */
function _stringifyUtcDate (date) {
  const
    year = date.getUTCFullYear().toString()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  return year + '-' + month + '-' + day
}

/**
 * @param {Date} date
 * @returns {string}
 */
function _stringifyTimezone (date) {
  const
    offset = date.getTimezoneOffset()
  const hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0')
  const minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0')

  return (offset > 0 ? '-' : '+') + hour + ':' + minute
}
