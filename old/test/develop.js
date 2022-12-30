const _ = require('@pfoerdie/utility');

// // const PRIMES = 10;
// // const PRIMES = 1e3;
// // const PRIMES = 10e6;
// const PRIMES = 50e6;
// // const PRIMES = 1e9; // the larger primes are too large for the int32 result array
// console.log('generating ' + PRIMES.toLocaleString() + ' prime numbers');
// console.time('time');
// try {
//     const primes = _.generate.primes(PRIMES);
//     if (primes.length > 10) {
//         console.log('primes: [' + primes.slice(0, 7).join(', ') + ', ..., '
//             + primes.slice(primes.length - 3, primes.length).join(', ') + ']');
//     } else {
//         console.log('primes: [' + primes.join(', ') + ']');
//     }
// } catch (err) {
//     console.error(err?.stack ?? err);
//     // debugger
// }
// console.timeEnd('time');

console.log(_.is.symbol.native(Symbol.iterator));