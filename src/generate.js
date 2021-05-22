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

    // NOTE buffer size maximum = 2 ** 32 - 1;
    // const sieve_max_size = 6; // works with length = 10
    const sieve_max_size = 2 ** 24 - 1; // good for length < 1 000 000
    // const sieve_max_size = 2 ** 25 - 1; // good for length > 2 000 000
    // IDEA find out a function for the optimal seive size at a given index
    //      to improve performance even further for this algorithm
    const not_prime = 0, is_prime = 1;
    let index = 1, lastPrime = 2, coveredMax = 3;
    while (index < length) {

        // 1. create an empty sieve of eratosthenes that extends
        // from the covered maximum to the square of the last found prime
        // and initialize it with the is prime value
        const
            sieveOffset = coveredMax,
            sieveSize = Math.min(lastPrime * lastPrime - sieveOffset, sieve_max_size),
            // NOTE its the maximal possibly sieve size currently, not the optimal
            sieveMax = sieveOffset + sieveSize;
        const sieve = Buffer.alloc(sieveSize, is_prime);

        // 2. mark all multiples of known primes in the sieve as not prime
        // and calculate the offset in the sieve array via modulo prime
        for (let i = 0; i < index; i++) {
            const prime = primes[i];
            if (prime * prime > sieveMax) break; // NOTE might reduce the multiplication
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
        if (index == lastIndex)
            throw new Error('no new primes found in the sieve');

        // 4. update covered maximum for the next iteration
        coveredMax = sieveMax;
    }

    return primes;
};