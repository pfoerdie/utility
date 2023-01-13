// const util = require('.')

const prop = exports

/**
 * @param {object} obj
 * @param  {...(string|symbol)} keys
 * @returns {prop}
 */
prop.lock = function (obj, ...keys) {
  const config = { configurable: false, writable: false }
  for (const key of keys) {
    const writable = !Object.hasOwn(obj, key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable
    if (writable) Object.defineProperty(obj, key, config)
  }
  return prop
}

/**
 * @param {object} obj
 * @param  {...(string|symbol)} keys
 * @returns {prop}
 */
prop.lock.hidden = function (obj, ...keys) {
  const config = { configurable: false, writable: false, enumerable: false }
  for (const key of keys) {
    const writable = !Object.hasOwn(obj, key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable
    if (writable) Object.defineProperty(obj, key, config)
  }
  return prop
}

/**
 * @param  {...object} objs
 * @returns {prop}
 */
prop.lock.all = function (...objs) {
  for (const obj of objs) {
    prop.lock(obj, ...Object.keys(obj))
  }
  return prop
}

/**
 * @param  {...object} objs
 * @returns {prop}
 */
prop.lock.all.hidden = function (...objs) {
  for (const obj of objs) {
    prop.lock.hidden(obj, ...Object.keys(obj))
  }
  return prop
}

/**
 * @param  {object} obj
 * @param  {number} [depth=Infinity]
 * @returns {prop}
 */
prop.lock.deep = function (obj, depth = Infinity) {
  const config = { configurable: false, writable: false }
  for (const key of Object.keys(obj)) {
    const writable = !Object.hasOwn(obj, key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable
    if (writable) {
      Object.defineProperty(obj, key, config)
      if (obj[key] instanceof Object && depth > 0) { prop.lock.deep(obj[key], depth - 1) }
    }
  }
  return prop
}

/**
 * @param  {object} obj
 * @param  {number} [depth=Infinity]
 * @returns {prop}
 */
prop.lock.deep.hidden = function (obj, depth = Infinity) {
  const config = { configurable: false, writable: false, enumerable: false }
  for (const key of Object.keys(obj)) {
    const writable = !Object.hasOwn(obj, key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable
    if (writable) {
      Object.defineProperty(obj, key, config)
      if (obj[key] instanceof Object && depth > 0) { prop.lock.deep(obj[key], depth - 1) }
    }
  }
  return prop
}

/**
 * @param {object} obj
 * @param  {...(string|symbol)} keys
 * @returns {prop}
 */
prop.hide = function (obj, ...keys) {
  const config = { enumerable: false }
  for (const key of keys) {
    const writable = !Object.hasOwn(obj, key) || Reflect.getOwnPropertyDescriptor(obj, key).configurable
    if (writable) Object.defineProperty(obj, key, config)
  }
  return prop
}

/**
 * @param  {...object} objs
 * @returns {prop}
 */
prop.hide.all = function (...objs) {
  for (const obj of objs) {
    prop.hide(obj, ...Object.keys(obj))
  }
  return prop
}
