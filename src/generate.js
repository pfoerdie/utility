const _ = require('.');

const generate = exports;

generate.sequence = function* (from = 0, to = 0, step = 1) {
    _.assert(_.is.number.finite(from), 'expected to be a finite number');
    _.assert(_.is.number(to), 'expected to be a number');
    _.assert(_.is.number(step), 'expected to be a number');
    step = Math.abs(step);
    if (from <= to) for (let value = from; value <= to; value += step) {
        yield value;
    }
    else for (let value = from; value >= to; value -= step) {
        yield value;
    }
};