const _ = require('../src');

describe('utility.test', function () {

    test('_.print', function () {
        expect(typeof _.print).toBe('function');
        _.print({ uid: 'test', test() { } }, 'test', [undefined, null, NaN, 0, '', [], { uid: 'test2' }, /./, new TypeError('test')]);
        _.print({ uid: 'test', test() { } }, 'test', "Hello World!");
        _.print({ uid: 'test', test() { } }, "Hello World!");
        _.print({ uid: 'test', test() { } }, 'test', new Error('lorem ipsum'));
        _.print({ uid: 'test' }, new Error('lorem ipsum'));
        _.print(Error, 'captureStackTrace', [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.print(Error, 'captureStackTrace', new Error('lorem ipsum'));
        _.print(Error, 'captureStackTrace', 'lorem ipsum');
        _.print(Error, [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.print(Error, new Error('lorem ipsum'));
        _.print(Error, 'lorem ipsum');
        _.print(new Error('lorem ipsum'));
        _.print('lorem ipsum');
        _.print("Hello World");
    });

});