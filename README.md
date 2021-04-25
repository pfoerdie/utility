# utility

```js
const _ = require('@pfoerdie/utility');
```

## assert

```js
_.assert(true === false, 'true !== false', Error);
```

## constants

```js
const {
    NODE_ENV, PROD, TEST,
    PI, E, EPSILON,
    $$iterator, $$species, $$hasInstance
} = _.constants;
```

## create

```js
const isEmptyString = _.create.StringValidator(/^\S*$/);
const isEmptyStringArray = _.create.ArrayValidator(isEmpty);
```

## errors

```js
const {
    Error, TypeError
} = _.errors;
```

## is

```js
_.is.boolean(true);
_.is.number(13.37);
_.is.string('lorem ipsum');
_.is.function(() => null);
_.is.object({});
_.is.typedarray(new Uint8Array(42));
```

## pattern

```js
_.pattern.IRI.test('http://example.org/');
```

## print

```js
_.print('Hello World!');
_.print(new Error('test'), 'constructor', ['test']);
```

## prop

```js
const obj = {test: 'lorem ipsum', abc: {a: 'a', b: 'b', c: 'c'}};
_.prop.lock.deep(obj);
```