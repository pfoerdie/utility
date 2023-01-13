const util = require('.')

const generate = exports

/**
 * @param {number} length
 * @returns {Iterator<number>}
 */
generate.sequence = function * (length = 0) {
  util.assert.number.integer(length, 0)
  for (let index = 0; index < length; index++) yield index
}

/**
 * @param {number} length
 * @returns {Int32Array}
 */
generate.primes = function (length = 0) {
  util.assert.number.integer(length, 0)
  const primes = new Int32Array(length) // a list of all primes
  if (length === 0) return primes
  primes[0] = 2 // set the first prime for the algorithm to work

  // 0. setup initial values for the algorithm
  const notPrime = 0; const isPrime = 1; const maxBufferSize = 2 ** 32 - 1
  let index = 1; let lastPrime = 2; let lastOffset = 2; let lastSieve = Buffer.alloc(1, isPrime)

  while (index < length) {
    // 1. create a new sieve of eratosthenes and copy the overlap from the last sieve over
    const
      offset = lastPrime + 1
    // this factor optimizes the sieve size for the given length and the current index
    const factor = 2 ** Math.max(0, Math.floor(Math.log10(length - index) - 2))
    const size = Math.min(
      // the factor must be at least 1 and will be multiplied
      // by the theoretical minimal gap size of the last prime to the next
      factor * Math.ceil(lastPrime ** 0.75 + Number.EPSILON),
      lastPrime ** 2 - offset,
      maxBufferSize
    )
    const sieve = Buffer.alloc(size, isPrime)
    const overlap = lastSieve.copy(sieve, 0, offset - lastOffset)
    const overlapOffset = 0 - (offset + overlap)

    // NOTE logging of algorithm steps:
    // console.log(Object.entries({ index, offset, overlap, size })
    //     .map(([key, value]) => key + ': ' + value.toLocaleString()).join(', '));

    // 2. mark all multiples of known primes in the sieve as not prime
    // and calculate the offset in the sieve array via modulo prime
    for (let i = 0; i < index; i++) {
      const prime = primes[i]
      for (let k = overlap + overlapOffset % prime, n = sieve.length - 1; k <= n; k += prime) {
        sieve[k] = notPrime
      }
    }

    // 3. find all primes in the sieve
    const lastIndex = index
    for (let k = 0, n = sieve.length - 1; k <= n; k++) {
      if (sieve[k] === isPrime) {
        primes[index++] = offset + k
        if (index >= length) break
      }
    }
    if (index === lastIndex) throw new Error('found no new primes in the current sieve')

    // 4. update last values for the next iteration
    lastPrime = primes[index - 1]
    if (lastPrime < 0) throw new Error('the primes are too large for the int32 result array')
    lastOffset = offset
    lastSieve = sieve
  }

  return primes
}
