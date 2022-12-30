const
    { join: joinPath } = require('path'),
    { createReadStream } = require('fs'),
    { readFile } = require('fs/promises'),
    _ = require('@pfoerdie/utility');

describe('utility.test', function () {

    test('_.audit', function () {
        expect(typeof _.audit).toBe('function');
        _.audit({ uid: 'test', test() { } }, 'test', [undefined, null, NaN, 0, '', [], { uid: 'test2' }, /./, new TypeError('test')]);
        _.audit({ uid: 'test', test() { } }, 'test', "Hello World!");
        _.audit({ uid: 'test', test() { } }, "Hello World!");
        _.audit({ uid: 'test', test() { } }, 'test', new Error('lorem ipsum'));
        _.audit({ uid: 'test' }, new Error('lorem ipsum'));
        _.audit(_.errors.Error, 'captureStackTrace', [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.audit(Error, 'captureStackTrace', new Error('lorem ipsum'));
        _.audit(Error, 'captureStackTrace', 'lorem ipsum');
        _.audit(Error, [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.audit(Error, new Error('lorem ipsum'));
        _.audit(Error, 'lorem ipsum');
        _.audit(new Error('lorem ipsum'));
        _.audit('lorem ipsum');
        _.audit("Hello World");
    });

    describe('_.method', function () {

        test('promify, promisify', async function () {
            expect(typeof _.method.promify).toBe('function');
            expect(typeof _.method.promisify).toBe('function');

            function testFn(prefix, suffix, callback) {
                const text = this?.text ?? ' ';
                callback(null, prefix + text + suffix);
            }
            expect(await _.method.promify(testFn, 'hello', 'world')).toBe('hello world');
            expect(await _.method.promify(testFn, 'lorem', 'ipsum')).toBe('lorem ipsum');

            const promFn = _.method.promisify(testFn);
            expect(await promFn('hello', 'world')).toBe('hello world');
            expect(await promFn('lorem', 'ipsum')).toBe('lorem ipsum');

            const testObj = { text: ', ' };
            expect(await _.method.promify.call(testObj, testFn, 'hello', 'world')).toBe('hello, world');
            expect(await _.method.promify.call(testObj, testFn, 'lorem', 'ipsum')).toBe('lorem, ipsum');

            const promFn2 = promFn.bind(testObj);
            expect(await promFn2('hello', 'world')).toBe('hello, world');
            expect(await promFn2('lorem', 'ipsum')).toBe('lorem, ipsum');
        });

        test('captureStream', async function () {
            const filePath = joinPath(__dirname, 'utility.test.js');
            await expect(_.method.captureStream(createReadStream(filePath), 1)).rejects.toThrow(Error);
            await expect(_.method.captureStream(createReadStream(filePath, { encoding: 'utf8' }), 10e3)).resolves.toMatch('method.captureStream');

            const capturedBuffer = await _.method.captureStream(createReadStream(filePath));
            expect(capturedBuffer).toBeInstanceOf(Buffer);

            const resultBuffer = await readFile(filePath);
            expect(resultBuffer.toString()).toBe(capturedBuffer.toString());
        });

        test('jsonChecksum (includes: stringChecksum, canonicalReviver)', function () {
            const
                cs1 = _.method.jsonChecksum({ a: 1, b: 2 }, 'sha256'),
                cs2 = _.method.jsonChecksum({ a: 2, b: 1 }, 'sha256'),
                cs3 = _.method.jsonChecksum({ b: 2, a: 1 }, 'sha256');
            expect(cs1).not.toBe(cs2);
            expect(cs1).toBe(cs3);
            const
                cs4 = _.method.jsonChecksum({ a: [1, 2], b: { c: null, d: 'hello world' } }),
                cs5 = _.method.jsonChecksum({ b: { d: 'hello world', c: null }, a: [1, 2] }),
                cs6 = _.method.jsonChecksum({ a: [2, 1], b: { c: null, d: 'hello world' } });
            expect(cs4).toBe(cs5);
            expect(cs4).not.toBe(cs6);
            const
                cs7 = _.method.jsonChecksum({ a: 1, b: 2 }, 'md5');
            expect(cs1).not.toBe(cs7);
        });

    });

    describe('_.generate', function () {

        // test('sequence', function () {
        //     expect(Array.from(_.generate.sequence(0, 5, 1))).toMatchObject([0, 1, 2, 3, 4, 5]);
        // });

        test('primes', function () {
            const first_10_primes = _.generate.primes(10);
            expect(first_10_primes).toBeInstanceOf(Int32Array);
            expect([...first_10_primes]).toMatchObject([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
        });

    });

});