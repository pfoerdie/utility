const _ = require('../src');

describe('utility.test', function () {

    test('_.audit', function () {
        expect(typeof _.audit).toBe('function');
        _.audit({ uid: 'test', test() { } }, 'test', [undefined, null, NaN, 0, '', [], { uid: 'test2' }, /./, new TypeError('test')]);
        _.audit({ uid: 'test', test() { } }, 'test', "Hello World!");
        _.audit({ uid: 'test', test() { } }, "Hello World!");
        _.audit({ uid: 'test', test() { } }, 'test', new Error('lorem ipsum'));
        _.audit({ uid: 'test' }, new Error('lorem ipsum'));
        _.audit(Error, 'captureStackTrace', [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.audit(Error, 'captureStackTrace', new Error('lorem ipsum'));
        _.audit(Error, 'captureStackTrace', 'lorem ipsum');
        _.audit(Error, [Error, 'lorem ipsum', new Error('lorem ipsum')]);
        _.audit(Error, new Error('lorem ipsum'));
        _.audit(Error, 'lorem ipsum');
        _.audit(new Error('lorem ipsum'));
        _.audit('lorem ipsum');
        _.audit("Hello World");
    });

});