const _ = require('@pfoerdie/utility');
const PRIMES = 1000;
console.log('generating ' + PRIMES + ' prime numbers');
console.time('time');
const primes = _.generate.primes(PRIMES);
console.timeEnd('time');