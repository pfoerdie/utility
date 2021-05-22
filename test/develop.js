const _ = require('@pfoerdie/utility');
const PRIMES = 1e6;
console.log('generating ' + PRIMES.toLocaleString() + ' prime numbers');
console.time('time');
try {
    const primes = _.generate.primes(PRIMES);
    // console.log(primes.join(', '));
} catch (err) {
    console.error(err?.stack ?? err);
    // debugger
}
console.timeEnd('time');