export function is(value: unknown): value is any {
  return true
}

import isBoolean from './boolean'
is.boolean = isBoolean

import isNumber from './number'
is.number = isNumber

export default is