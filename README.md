# @pfoerdie/utility

```js
const util = require('@pfoerdie/utility')
```

## assert

```js
util.assert(true === false, 'true !== false', Error)
```

## constants

```js
const {
    NODE_ENV, PROD, TEST,
    PI, E, EPSILON,
    $$iterator, $$species, $$hasInstance
} = util.constants;
```

## create

```js
const isEmptyString = util.create.StringValidator(/^\S*$/)
const isEmptyStringArray = util.create.ArrayValidator(isEmpty)
```

## errors

```js
const {
    Error, TypeError
} = util.errors;
```

## is

```js
util.is.boolean(true)
util.is.number(13.37)
util.is.string('lorem ipsum')
util.is.function(() => null)
util.is.object({})
util.is.typedarray(new Uint8Array(42))
```

## pattern

```js
util.pattern.iri.test('http://example.org/')
```

## print

```js
util.print('Hello World!')
util.print(new Error('test'), 'constructor', ['test'])
```

## prop

```js
const obj = {test: 'lorem ipsum', abc: {a: 'a', b: 'b', c: 'c'}}
util.prop.lock.deep(obj)
```
