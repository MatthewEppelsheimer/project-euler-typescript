import testFactory from '../../test';
import { assertArrayMembersAreEqual } from '../array-assertions';

let tested = false;

/**
 * Generate an array of prime numbers with values up to provided value
 */
function calculatePrimeNumbers(upToValue: number = 100, options?: {verbose?: boolean}): number[] {
  console.info(`Calculating prime numbers with values up to ${upToValue}`);
  const primes: number[] = [];

  for (let candidate = 1; candidate < upToValue; candidate++) {
    if (options?.verbose && upToValue > 1000000 && 0 === candidate % 1000000) {
      console.info(`..progress: ${Math.round(candidate / upToValue * 100)}%`);
    }

    if (1 === candidate) {
      primes.push(candidate);
      continue;
    }

    let foundPrimeFactor = false;
    for (let i = 1; i < primes.length; i++) {
      if (0 === candidate % primes[i]) {
        foundPrimeFactor = true;
        break;
      }
    }

    if (!foundPrimeFactor) {
      primes.push(candidate);
    }
  }
  return primes;
}

function testCalculatePrimeNumbers() {
  const test = testFactory();

  const standard = [1, 2, 3, 5, 7, 11, 13, 17, 19];
  const output = calculatePrimeNumbers(20);

  test<typeof calculatePrimeNumbers>(
    `output length`,
    () => standard.length === output.length,
    output
  );

  test<typeof calculatePrimeNumbers>(
    `find primes whose values are less than 20`,
    () => {
      assertArrayMembersAreEqual(standard, output);
      return true;
    },
    output
  );
}

export default (() => {
  !tested && testCalculatePrimeNumbers();
  tested = true;
  
  return calculatePrimeNumbers;
})();
