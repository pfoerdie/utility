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
    const primes = new Int32Array(length); // a list of all primes for later reference
    if (length == 0) return primes;
    // primes[0] = 2; // NOTE this would be necessary for 5. to work

    // Sieve of Eratosthenes
    const not_prime = 0, is_prime = 1;
    let currentSieve = Buffer.alloc(1, is_prime), currentOffset = 2; // NOTE this variable would be redundant for 5. to work

    for (let index = 0, lastIndex = length - 1; index < lastIndex; index++) {
        // 1. find the next prime in the valid sieve and add it to the primes
        // TODO this might be redundant, if 5. is working
        for (let k = 0; k < currentSieve.length; k++) {
            if (currentSieve[k] == is_prime) {
                primes[index] = currentOffset + k;
                break;
            }
        }

        // 2. extend the current sieve to the next prime range, excluding the previously searched sieve
        const
            foundPrime = primes[index],
            sieveLength = foundPrime ** 2 - foundPrime,
            newSieve = Buffer.alloc(sieveLength, is_prime),
            newOffset = foundPrime + 1,
            sieveOverlap = currentSieve.copy(newSieve, 0, newOffset - currentOffset);

        // 3. validate the new portion of the sieve with the currently known primes
        newSieve[sieveLength - 1] = not_prime; // the sieve happens to end with the square of the previously found prime
        for (let i = 0; i < index; i++) { // now we also does not have to include it in the validation
            const prime = primes[i], primeOffset = (- newOffset - sieveOverlap) % prime;
            // the overlapping part does not need to be validated
            for (let k = sieveOverlap + primeOffset; k < newSieve.length; k += prime) {
                // mark all multiple of the prime as not prime
                newSieve[k] = not_prime;
            }
        }

        // console.log(`(${index}) Sieve<${currentOffset},${currentOffset + currentSieve.length - 1}>: [${currentSieve.length > 20
        //     ? currentSieve.subarray(0, 20).join() + ',...'
        //     : currentSieve.join()
        //     }] => ${foundPrime}`);

        // 4. set the new sieve as current sieve
        currentSieve = newSieve;
        currentOffset = newOffset;

        // IDEA: this can be much much much much faster!!!!!!!
        // 5. add the primes now, instead of at 1., because the whole sieve is valid at this point
        //    also, do not copy the old sieve over, because its part of a valid sieve and must not be reused
        // for (let k = 0; k < currentSieve.length; k++) {
        //     if (currentSieve[k] == is_prime) {
        //         primes[index] = currentOffset + k;
        //         break;
        //     }
        // }
    }

    // this extra for loop replaces the last iteration of the main for loop,
    // because it does not need to create the next sieve
    // TODO this would also be redundant, if 5. is working
    for (let k = 0; k < currentSieve.length; k++) {
        if (currentSieve[k] == is_prime) {
            primes[length - 1] = currentOffset + k;
            break;
        }
    }

    return primes;
};