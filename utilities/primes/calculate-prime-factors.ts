import testFactory from '../test';
import { assertArrayMembersAreEqual } from '../array-assertions';

import calculatePrimeNumbers from './calculate-prime-numbers';

let tested = false;

function calculatePrimeFactors(
  subject: number,
  options?: { verbose?: boolean; largestOnly?: boolean }
): number[] {
  // the largest can't be more than half the subject's value
  const primes = calculatePrimeNumbers(subject / 2, options);

  // Algorithm: check decending, stop when find one
  if (true === options?.largestOnly) {
    for (let i = primes.length; i > 0; i--) {
      if (0 === subject % primes[i]) {
        return [primes[i]];
      }
    }
    // no prime factors (which would make it prime)
    return [];
  }

  // Algorithm: check ascending
  const primeFactors: number[] = [1]; // 1 is always a factor
  for (let i = 1; i < primes.length; i++) {
    0 === subject % primes[i] && primeFactors.push(primes[i]);
  }
  return primeFactors;
}

function testCalculatePrimeFactors() {
  const test = testFactory();

  const output1 = calculatePrimeFactors(13195);

  test<typeof calculatePrimeFactors>(
    `prime factors of 13195`,
    () => {
      assertArrayMembersAreEqual([1, 5, 7, 13, 29], output1);
    },
    output1
  );

  const output2 = calculatePrimeFactors(13195, { largestOnly: true });

  test<typeof calculatePrimeFactors>(
    `only largest prime factor of 13195`,
    () => {
      assertArrayMembersAreEqual([29], output2);
    },
    output2
  );
}

export default (() => {
  !tested && testCalculatePrimeFactors();
  tested = true;

  return calculatePrimeFactors;
})();
