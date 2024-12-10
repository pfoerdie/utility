export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

type NaN = number

export function isNaN(value: unknown): value is NaN {
  return isNumber(value) && Number.isNaN(value)
}

isNumber.nan = isNaN

type Integer = number

export function isInteger(value: unknown): value is Integer {
  return isNumber(value) && Number.isSafeInteger(value)
}

isNumber.integer = isInteger

type NonNegativeInteger = Integer

export function isNonNegativeInteger(value: unknown): value is NonNegativeInteger {
  return isInteger(value) && value >= 0
}

isInteger.nonnegative = isNonNegativeInteger

type PositiveInteger = NonNegativeInteger

export function isPositiveInteger(value: unknown): value is PositiveInteger {
  return isInteger(value) && value > 0
}

isInteger.positive = isPositiveInteger

type NonPositiveInteger = Integer

export function isNonPositiveInteger(value: unknown): value is NonPositiveInteger {
  return isInteger(value) && value <= 0
}

isInteger.nonpositive = isNonPositiveInteger

type NegativeInteger = NonPositiveInteger

export function isNegativeInteger(value: unknown): value is NegativeInteger {
  return isInteger(value) && value < 0
}

isInteger.negative = isNegativeInteger

type Float = number

export function isFloat(value: unknown): value is Float {
  return isNumber(value) && !Number.isNaN(value)
}

isNumber.float = isFloat

type FiniteFloat = Float

export function isFiniteFloat(value: unknown): value is FiniteFloat {
  return isFloat(value) && Number.isFinite(value)
}

isFloat.finite = isFiniteFloat

export default isNumber