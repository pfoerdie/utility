const _ = require('@pfoerdie/utility');

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

    test('_.method.promi[si]fy', async function () {
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

});