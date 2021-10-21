const _ = require('.');

const time = module.exports = function (value) {
    const
        _date = _parseDate(value),
        time = _stringifyTime(_date),
        timezone = _stringifyTimezone(d_dateate);

    return time + timezone;
};

time.date = function (value) {
    const
        _date = _parseDate(value),
        date = _stringifyDate(_date),
        timezone = _stringifyTimezone(_date);

    return date + timezone;
};

time.datetime = function (value) {
    const
        _date = _parseDate(value),
        time = _stringifyTime(_date),
        date = _stringifyDate(_date),
        timezone = _stringifyTimezone(_date);

    return date + 'T' + time + timezone;
};

// TODO UTC

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

function _stringifyDate(date) {
    const
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

function _stringifyTimezone(date) {
    const
        offset = date.getTimezoneOffset(),
        hour = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0'),
        minute = Math.floor(Math.abs(offset) % 60).toString().padStart(2, '0');

    return (offset > 0 ? '-' : '+') + hour + ':' + minute;
}