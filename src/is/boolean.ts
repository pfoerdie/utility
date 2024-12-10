export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isTrue(value: unknown): value is true {
  return value === true
}

isBoolean.true = isTrue

export type Truthy<T> = Falsy extends T ? never : T

export function isTruthy<T>(value: T): value is Truthy<T> {
  return !!value
}

isBoolean.truthy = isTruthy

export function isFalse(value: unknown): value is false {
  return value === false
}

isBoolean.false = isFalse

export type Falsy = null | undefined | false | 0 | -0 | 0n | ''

export function isFalsy(value: unknown): value is Falsy {
  return !value
}

isBoolean.falsy = isFalsy

export default isBoolean