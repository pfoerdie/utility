const
    _ = require('.'),
    colored = true;

/**
 * @param {object|function|Error|string} scope 
 * @param {string|Iterable|Error|string} method 
 * @param {Iterable|Error|string} args 
 */
const print = module.exports = function (scope, method, args) {
    if (_.constants.PROD) return;
    let output = styleLogStart();

    if (_.is.string(scope)) {
        output += styleMessage(scope);
    } else if (scope instanceof Error) {
        output += styleError(scope);
    } else if (scope instanceof Object) {
        output += styleInstance(scope);
        if (_.is.string(method)) {
            if (Reflect.has(scope, method)) {
                output += style.grey('.') + style.magenta(method);
                if (_.is.string(args))
                    output += ' ' + styleMessage(args);
                else if (args instanceof Error)
                    output += ' ' + styleError(args);
                else if (_.is.object.iterable(args) && _.is.number(args.length))
                    output += styleArguments(args);
            } else {
                output += ' ' + styleMessage(method);
            }
        } else if (method instanceof Error) {
            output += ' ' + styleError(method);
        } else if (_.is.object.iterable(method) && _.is.number(method.length)) {
            output += styleArguments(method);
        }
    }

    // console.log(output);
    process.stdout.write(output + '\n');
};

/**
 * @returns {string}
 */
function styleLogStart() {
    const now = new Date();
    return style.grey('[' + now.toLocaleTimeString() + '.' + now.getMilliseconds() + ']:') + ' ';
}

/**
 * @param {string} msg 
 * @returns {string}
 */
function styleMessage(msg) {
    return style.yellow(msg);
}

/**
 * @param {Error} err 
 * @returns {string}
 */
function styleError(err) {
    return style.red(err.message) + '\n' + style.grey(err.stack);
}

/**
 * @param {boolean|number|string} value 
 * @returns {string}
 */
function stylePrimitive(value) {
    if (_.is.null(value)) return style.green('' + value);
    if (_.is.boolean(value)) return style.green('' + value);
    if (_.is.number(value)) return style.green('' + value);
    if (_.is.string(value)) return style.green('"' + value + '"');
    return style.green(JSON.stringify(value));
}

/**
 * @param {any} obj 
 * @returns {string}
 */
function styleObject(obj) {
    const label = obj?.__proto__.constructor.name ?? '' + obj;
    const info = obj?.uid ?? obj?.['@id'];
    let output = '';
    output += style.blue(label);
    if (info) output += style.grey('<') + style.green(info) + style.grey('>');
    return output;
}

/**
 * 
 * @param {object|function} obj 
 * @returns {string}
 */
function styleInstance(obj) {
    let output = style.cyan(obj.__proto__.constructor.name);
    if (_.is.object(obj)) output += style.grey('<')
        + style.green(obj?.uid ?? obj?.['@id'] ?? '')
        + style.grey('>');
    return output;
}

/**
 * @param {{length: number, [index: number]: any}} args 
 * @returns {string}
 */
function styleArguments(args) {
    let output = style.grey('(');
    for (let i = 0, max = args.length; i < max; i++) {
        if (i > 0) output += style.grey(', ');
        output += styleObject(args[i]);
    }
    output += style.grey(')');
    return output;
}

function style(code) {
    return '\u001b[' + code + 'm';
}

style.bold = function (str) {
    if (!colored) return str;
    return style(1) + str + style(22);
};

style.italic = function (str) {
    if (!colored) return str;
    return style(3) + str + style(23);
};

style.underline = function (str) {
    if (!colored) return str;
    return style(4) + str + style(24);
};

style.strikethrough = function (str) {
    if (!colored) return str;
    return style(9) + str + style(29);
};

style.black = function (str) {
    if (!colored) return str;
    return style(30) + str + style(39);
};

style.red = function (str) {
    if (!colored) return str;
    return style(31) + str + style(39);
};

style.green = function (str) {
    if (!colored) return str;
    return style(32) + str + style(39);
};

style.yellow = function (str) {
    if (!colored) return str;
    return style(33) + str + style(39);
};

style.blue = function (str) {
    if (!colored) return str;
    return style(34) + str + style(39);
};

style.magenta = function (str) {
    if (!colored) return str;
    return style(35) + str + style(39);
};

style.cyan = function (str) {
    if (!colored) return str;
    return style(36) + str + style(39);
};

style.white = function (str) {
    if (!colored) return str;
    return style(37) + str + style(39);
};

style.grey = function (str) {
    if (!colored) return str;
    return style(90) + str + style(39);
};