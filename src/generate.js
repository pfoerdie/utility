const _ = require('.');

const generate = exports;

generate.sequence = function* (length = 0) {
    _.assert.number.integer(length, 0);
    for (let index = 0; index < length; index++) yield index;
};

// IDEA
// generate.sequence = function (length = 0) {
//     _.assert.number(length, 0);
//     return {
//         *[Symbol.iterator]() { for (let index = 0; index < length; index++) yield index; },
//         *map(fn) { }
//     };
// };

generate.primes = function (length = 0) {
    _.assert.number.integer(length, 0);
    const primes = new Int32Array(length); // a list of all primes
    if (length == 0) return primes;
    primes[0] = 2; // set the first prime for the algorithm to work

    const
        // sieve_max_size = 2 ** 24 - 1, // good for length < 1 000 000
        // sieve_max_size = 2 ** 25 - 1, // good for length > 2 000 000
        buffer_max_size = 2 ** 32 - 1;

    const not_prime = 0, is_prime = 1;
    let index = 1, lastPrime = 2, coveredMax = 3;
    while (index < length) {
        // 1. create an empty sieve of eratosthenes that extends
        // from the covered maximum to at max the square of the last found prime
        // and initialize it with the is prime value
        const
            sieveOffset = coveredMax,
            sieveMaxGap = Math.ceil(lastPrime ** .75),
            sieveMaxRange = lastPrime * lastPrime,
            sieveMax = Math.min(Math.max(
                // this method optimizes the sieve size for the given length and the current index
                sieveOffset + 2 ** Math.floor(Math.log10(length - index)) * sieveMaxGap,
                sieveOffset + sieveMaxGap), sieveMaxRange
            ),
            sieveSize = Math.min(sieveMax - sieveOffset, buffer_max_size);

        // console.log(Object.entries({ index, lastPrime, sieveMax, sieveOffset, sieveSize })
        //     .map(([key, value]) => key + ': \u001b[1m' + value.toLocaleString() + '\u001b[22m').join(', '));

        const
            sieve = Buffer.alloc(sieveSize, is_prime),
            sieveCoveredMax = sieveOffset + sieveSize,
            sieveLastPossiblePrime = Math.floor(Math.sqrt(sieveCoveredMax));

        // 2. mark all multiples of known primes in the sieve as not prime
        // and calculate the offset in the sieve array via modulo prime
        for (let i = 0; i < index; i++) {
            const prime = primes[i];
            if (prime > sieveLastPossiblePrime) break;
            for (let k = (- sieveOffset) % prime; k < sieveSize; k += prime) {
                sieve[k] = not_prime;
            }
        }

        // 3. update covered maximum add all left primes in the sieve 
        // to the primes array and increment the index
        const lastIndex = index;
        for (let k = 0; k < sieveSize; k++) {
            if (sieve[k] == is_prime) {
                lastPrime = sieveOffset + k;
                primes[index++] = lastPrime;
                if (index >= length) break;
            }
        }
        if (index == lastIndex) throw new Error('no new primes found in the sieve');

        // 4. update covered maximum for the next iteration
        coveredMax = sieveCoveredMax;
    }

    return primes;
};

// NOTE The current prime number generator is pretty good, it generates 10 million primes in 5 seconds.
//      The implemented algorithm seems to be optimized as far as possible. But the question still remains,
//      can a similar algorithm irradicate the flaws of this algorithm and do less unnessesary work
//      by maybe copying buffers and be faster although the sieves have to overlap?
//      Is there a clever way to manage this overlap during iteration? Then I could revert to a foor loop as previously!