const
    crypto = require('crypto'),
    _ = require('.');

const method = exports;

/**
 * This methods wraps a function with callback mechanic and its arguments into a Promise.
 * A this context can be supplied via 'call' or 'apply'.
 * @param {function(...any, (err: null|Error, result: any) => void): void} fn 
 * @param  {...any} args 
 * @returns {Promise<any>}
 */
method.promify = function (fn, ...args) {
    _.assert.function(fn);
    return new Promise((resolve, reject) => {
        args.push((err, result) => err ? reject(err) : resolve(result));
        fn.apply(this, args);
    });
};

/**
 * This methos wraps a function with callback mechanic into a function with Promise mechanic.
 * A this context can be bound to the resulting function via 'bind'.
 * @param {function(...any, (err: null|Error, result: any) => void): void} fn 
 * @returns {function(...any): Promise<any>}
 */
method.promisify = function (fn) {
    _.assert.function(fn);
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push((err, result) => err ? reject(err) : resolve(result));
            fn.apply(this, args);
        });
    };
};

/**
 * The method wraps a readable stream into a Promise.
 * The result is ether a string, a Buffer or an object array, 
 * depending on readableObjectMode and readableEncoding.
 * @param {ReadableStream<string|Buffer|object>} stream 
 * @param {number} [timeout] Optional timeout in ms, after which the stream will be destroyed and an error will be thrown.
 * @returns {Promise<string|Buffer|Array<object>>}
 */
method.captureStream = function (stream, timeout = 0) {
    _.assert(stream?.readable, 'expected to be a readable stream');
    _.assert.function(stream?.on);
    return new Promise((resolve, reject) => {
        let chunks = [], finished = false, timeout_id = null;
        if (timeout > 0 && timeout < Infinity) {
            timeout_id = setTimeout(() => {
                if (finished) return;
                const err = new Error('stream capture timed out after ' + timeout + 'ms');
                timeout_id = null;
                stream.destroy(err);
            }, timeout);
        }
        stream.on('data', (chunk) => {
            if (finished) return;
            chunks.push(chunk);
        });
        stream.on('error', (err) => {
            if (finished) return;
            finished = true;
            if (timeout_id) clearTimeout(timeout_id);
            reject(err);
        });
        stream.on('end', () => {
            if (finished) return;
            finished = true;
            let
                objectMode = stream.readableObjectMode,
                encoding = stream.readableEncoding,
                data = null;
            try {
                if (timeout_id) clearTimeout(timeout_id);
                if (objectMode) data = chunks;
                else if (encoding) data = chunks.join('');
                else data = Buffer.concat(chunks);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    });
};

/**
 * The method is used to revive json object vie JSON.parse.
 * The resulting json will contain lexically sorted object keys.
 * @param {string} key 
 * @param {any} value 
 * @returns {any}
 */
method.canonicalReviver = function (key, value) {
    if (!_.is.object(value) || _.is.array(value)) return value;
    const entries = Object.entries(value);
    entries.sort(([keyA], [keyB]) => keyA < keyB ? -1 : 1);
    return Object.fromEntries(entries);
};

/**
 * The method creates a hash from a string value.
 * @param {string} str 
 * @param {string} [algorithm='md5'] 
 * @param {string} [encoding='hex'] 
 * @returns {string}
 */
method.stringChecksum = function (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
};

/**
 * The method creates a hash from a json artifact, after canocicalizing the json first.
 * This ensures an independence of the object key order.
 * @param {JSON} json 
 * @param {string} [algorithm='md5'] 
 * @param {string} [encoding='hex'] 
 * @returns {string}
 */
method.jsonChecksum = function (json, algorithm, encoding) {
    const
        jsonStr = JSON.stringify(json),
        canonicalStr = JSON.stringify(JSON.parse(jsonStr, method.canonicalReviver)),
        hashStr = method.stringChecksum(canonicalStr, algorithm, encoding);
    return hashStr;
};