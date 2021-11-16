const _ = require('.');

const time = module.exports = function (value) {
    const date = _parseDate(value);
    return _stringifyTime(date);
};

time.iso = function (value) {
    const date = _parseDate(value);
    return _stringifyTime(date) + _stringifyTimezone(date);
};

time.utc = function (value) {
    const date = _parseDate(value);
    return _stringifyUtcTime(date) + 'Z';
};

time.date = function (value) {
    const date = _parseDate(value);
    return _stringifyDate(date);
};

time.date.iso = function (value) {
    const date = _parseDate(value);
    return _stringifyDate(date) + _stringifyTimezone(date);
};

time.date.utc = function (value) {
    const date = _parseDate(value);
    return _stringifyUtcDate(date) + 'Z';
};

time.datetime = function (value) {
    const date = _parseDate(value);
    return _stringifyDate(date) + 'T' + _stringifyTime(date);
};

time.datetime.iso = function (value) {
    const date = _parseDate(value);
    return _stringifyDate(date) + 'T' + _stringifyTime(date) + _stringifyTimezone(date);
};

time.datetime.utc = function (value) {
    const date = _parseDate(value);
    return _stringifyUtcDate(date) + 'T' + _stringifyUtcTime(date) + 'Z';
};

function _parseDate(value) {
    if (_.is.null(value)) return new Date();
    return new Date(value);
}

function _stringifyTime(date) {
    const
        hour = date.getHours().toString().padStart(2, '0'),
        minute = date.getMinutes().toString().padStart(2, '0'),
        second = date.getSeconds().toString().padStart(2, '0'),
        millisecond = date.getMilliseconds().toString();

    return hour + ':' + minute + ':' + second + '.' + millisecond;
}

function _stringifyUtcTime(date) {
    const
        hour = date.getUTCHours().toString().padStart(2, '0'),
        minute = date.getUTCMinutes().toString().padStart(2, '0'),
        second = date.getUTCSeconds().toString().padStart(2, '0'),
        millisecond = date.getUTCMilliseconds().toString();

    return hour + ':' + minute + ':' + second + '.' + millisecond;
}

function _stringifyDate(date) {
    const
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

function _stringifyUtcDate(date) {
    const
        year = date.getUTCFullYear().toString(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, '0'),
        day = date.getUTCDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

function _stringifyTimezone(date) {
    const
        offset = date.getTimezoneOffset(),
        hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');

    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
}