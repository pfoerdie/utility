const _ = require('@pfoerdie/utility');
// const PRIMES = 2;
// const PRIMES = 1e3;
// const PRIMES = 1e6;
const PRIMES = 10e6;
// const PRIMES = 50e6;
console.log('generating ' + PRIMES.toLocaleString() + ' prime numbers');
console.time('time');
try {
    const primes = _.generate.primes(PRIMES);
    if (primes.length > 10) {
        console.log('primes: [' + primes.slice(0, 5).join(', ') + ', ..., '
            + primes.slice(primes.length - 5, primes.length).join(', ') + ']');
    } else {
        console.log('primes: [' + primes.join(', ') + ']');
    }
} catch (err) {
    console.error(err?.stack ?? err);
    // debugger
}
console.timeEnd('time');