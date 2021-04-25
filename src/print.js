const
    _ = require('.'),
    colored = true;

/**
 * // TODO modulize
 * @param {object|function|Error|string} scope 
 * @param {string|Iterable|Error|string} method 
 * @param {Iterable|Error|string} args 
 */
const print = module.exports = function (scope, method, args) {
    if (_.constants.PROD) return;
    let output = '';

    if (_.is.string(scope)) {
        output += yellow(scope);
    } else if (scope instanceof Error) {
        output += red(scope.message) + '\n' + grey(scope.stack);
    } else if (scope instanceof Object) {
        if (_.is.object(scope)) {
            const
                scopeName = scope.__proto__.constructor.name,
                scopeData = scope.uid ?? scope['@id'] ?? '';

            output += cyan(scopeName) + grey('<') + green(scopeData) + grey('>');
        } else {
            output += cyan(scope.name);
        }

        if (_.is.string(method)) {
            if (!Reflect.has(scope, method)) {
                output += ' ' + yellow(method);
            } else {
                output += grey('.') + magenta(method);

                if (_.is.string(args)) {
                    output += ' ' + yellow(args);
                } else if (args instanceof Error) {
                    output += ' ' + red(args.message) + '\n' + grey(args.stack);
                } else if (_.is.iterable(args) && _.is.number(args.length)) {
                    const
                        argPairs = Array.from(args).map(arg => [
                            arg?.__proto__.constructor.name ?? '' + arg,
                            arg?.uid ?? arg?.['@id'] ?? ''
                        ]);

                    output += grey('(')
                        + argPairs.map(([argName, argData]) =>
                            blue(argName) + (argData ? grey('<') + green(argData) + grey('>') : '')
                        ).join(grey(', '))
                        + grey(')');
                }
            }
        } else if (method instanceof Error) {
            output += ' ' + red(method.message) + '\n' + grey(method.stack);
        } else if (_.is.iterable(method) && _.is.number(method.length)) {
            const
                argPairs = Array.from(method).map(arg => [
                    arg?.__proto__.constructor.name ?? '' + arg,
                    arg?.uid ?? arg?.['@id'] ?? ''
                ]);

            output += grey('(')
                + argPairs.map(([argName, argData]) =>
                    blue(argName) + (argData ? grey('<') + green(argData) + grey('>') : '')
                ).join(grey(', '))
                + grey(')');
        }
    }

    console.log(output);
};

function bold(value) {
    if (!colored) return value;
    return '\u001b[1m' + value + '\u001b[22m';
}

function italic(value) {
    if (!colored) return value;
    return '\u001b[3m' + value + '\u001b[23m';
}

function underline(value) {
    if (!colored) return value;
    return '\u001b[4m' + value + '\u001b[24m';
}

function strikethrough(value) {
    if (!colored) return value;
    return '\u001b[9m' + value + '\u001b[29m';
}

function black(value) {
    if (!colored) return value;
    return '\u001b[30m' + value + '\u001b[39m';
}

function red(value) {
    if (!colored) return value;
    return '\u001b[31m' + value + '\u001b[39m';
}

function green(value) {
    if (!colored) return value;
    return '\u001b[32m' + value + '\u001b[39m';
}

function yellow(value) {
    if (!colored) return value;
    return '\u001b[33m' + value + '\u001b[39m';
}

function blue(value) {
    if (!colored) return value;
    return '\u001b[34m' + value + '\u001b[39m';
}

function magenta(value) {
    if (!colored) return value;
    return '\u001b[35m' + value + '\u001b[39m';
}

function cyan(value) {
    if (!colored) return value;
    return '\u001b[36m' + value + '\u001b[39m';
}

function white(value) {
    if (!colored) return value;
    return '\u001b[37m' + value + '\u001b[39m';
}

function grey(value) {
    if (!colored) return value;
    return '\u001b[90m' + value + '\u001b[39m';
}