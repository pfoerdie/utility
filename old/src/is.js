const _ = require('.');

const is = module.exports = function (value) {
    return value !== void 0;
};

is.not = function (value) {
    return !is(value);
};

is.null = function (value) {
    return (value ?? null) === null;
};

is.not.null = function (value) {
    return !is.null(value);
};

is.primitive = function (value) {
    return is.boolean(value) || is.number(value) || is.string(value);
};

is.boolean = function (value) {
    return typeof value === 'boolean';
};

is.boolean.true = function (value) {
    return value === true;
};

is.boolean.false = function (value) {
    return value === false;
};

is.truthy = function (value) {
    return !!value;
};

is.falsy = function (value) {
    return !value;
};

is.number = function (value) {
    return typeof value === 'number' && !Number.isNaN(value);
};

is.number.any = function (value) {
    return typeof value === 'number';
};

is.number.nan = function (value) {
    return typeof value === 'number' && Number.isNaN(value);
};

is.number.integer = function (value) {
    return is.number(value) && Number.isSafeInteger(value);
};

is.number.integer.positive = function (value) {
    return is.number.integer(value) && value > 0;
};

is.number.integer.nonnegative = function (value) {
    return is.number.integer(value) && value >= 0;
};

is.number.integer.nonpositive = function (value) {
    return is.number.integer(value) && value <= 0;
};

is.number.integer.negative = function (value) {
    return is.number.integer(value) && value < 0;
};

is.number.finite = function (value) {
    return is.number(value) && Number.isFinite(value);
};

is.string = function (value) {
    return typeof value === 'string';
};

is.string.nonempty = function (value) {
    return is.string(value) && _.pattern.nonempty.test(value);
};

is.string.IRI = function (value) {
    return is.string(value) && _.pattern.IRI.test(value);
};

is.string.date = function (value) {
    return is.string(value) && is.date(new Date(value));
};

is.symbol = function (value) {
    return typeof value === 'symbol';
};

is.symbol.native = function (value) {
    return is.symbol(value) && Reflect.ownKeys(Symbol).some(key => value === Symbol[key]);
};

is.function = function (value) {
    return typeof value === 'function';
};

is.function.callable = function (value) {
    return is.function(value) && (!value.hasOwnProperty('prototype') || value.hasOwnProperty('arguments'));
};

is.function.class = function (value) {
    return is.function(value) && value.hasOwnProperty('prototype') && !value.hasOwnProperty('arguments');
};

is.object = function (value) {
    return value && typeof value === 'object';
};

is.object.null = function (value) {
    return value === null;
};

is.object.nonempty = function (value) {
    return is.object(value) && Object.values(value).some(is.not.null);
};

is.object.iterable = function (value) {
    return is.object(value) && is.function(value[Symbol.iterator]);
};

is.object.JSON = function (value) {
    try {
        return is.object(value) && is.object(JSON.parse(JSON.stringify(value)));
    } catch (err) {
        return false;
    }
};

is.array = function (value) {
    return Array.isArray(value);
};

is.array.nonempty = function (value) {
    return is.array(value) && value.some(val => !is.null(val));
};

is.array.numbers = function (value) {
    return is.array(value) && value.every(_.is.number);
};

is.array.strings = function (value) {
    return is.array(value) && value.every(_.is.string);
};

is.array.functions = function (value) {
    return is.array(value) && value.every(_.is.function);
};

is.array.objects = function (value) {
    return is.array(value) && value.every(_.is.object);
};

is.typedarray = function (value) {
    return ArrayBuffer.isView(value) && !(value instanceof DataView);
};

is.typedarray.int = function (value) {
    return is.typedarray.int8(value)
        || is.typedarray.int16(value)
        || is.typedarray.int32(value);
};

is.typedarray.int8 = function (value) {
    return value instanceof Int8Array;
};

is.typedarray.int16 = function (value) {
    return value instanceof Int16Array;
};

is.typedarray.int32 = function (value) {
    return value instanceof Int32Array;
};

is.typedarray.uint = function (value) {
    return is.typedarray.uint8(value)
        || is.typedarray.uint16(value)
        || is.typedarray.uint32(value);
};

is.typedarray.uint8 = function (value) {
    return value instanceof Uint8Array;
};

is.typedarray.uint16 = function (value) {
    return value instanceof Uint16Array;
};

is.typedarray.uint32 = function (value) {
    return value instanceof Uint32Array;
};

is.typedarray.float = function (value) {
    return is.typedarray.float32(value)
        || is.typedarray.float64(value);
};

is.typedarray.float32 = function (value) {
    return value instanceof Float32Array;
};

is.typedarray.float64 = function (value) {
    return value instanceof Float64Array;
};

is.typedarray.bigint = function (value) {
    return value instanceof BigInt64Array;
};

is.typedarray.biguint = function (value) {
    return value instanceof BigUint64Array;
};

is.date = function (value) {
    return value instanceof Date && is.number(value.getTime());
};

is.buffer = function (value) {
    return Buffer.isBuffer(value);
};

is.error = function (value) {
    return value instanceof Error;
};

is.promise = function (value) {
    return value instanceof Promise;
};