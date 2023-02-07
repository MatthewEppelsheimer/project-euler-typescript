import testFactory from '../test';
import { assertArrayMembersAreEqual } from '../array-assertions';

function* primeIterator() {
  yield 1;
  yield 2;

  const primes: number[] = [1, 2];

  let candidate = 3;

  do {
    let foundPrimeFactor = false;
    for (let i = 1; i < primes.length; i++) {
      if (0 === candidate % primes[i]) {
        foundPrimeFactor = true;
        break;
      }
    }

    if (!foundPrimeFactor) {
      primes.push(candidate);
      yield candidate;
    }

    candidate++;
  } while (true);
}

function testPrimeIterator() {
  const test = testFactory();

  const sut = primeIterator();
  const generatedPrimes: number[] = [];

  for (let i = 0; i < 9; i++) {
    generatedPrimes.push(sut.next().value as number);
  }

  test(
    `first 9 primes`,
    () => {
      assertArrayMembersAreEqual(
        [1, 2, 3, 5, 7, 11, 13, 17, 19],
        generatedPrimes
      );
    },
    generatedPrimes
  );
}
let tested = false;

export default (() => {
  !tested && testPrimeIterator();
  tested = true;

  return primeIterator;
})();
