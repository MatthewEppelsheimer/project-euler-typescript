import { primeIterator } from '../utilities/prime-numbers';

// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143?

function solution() {
  const SUBJECT = 600851475143;

  const prime = primeIterator();

  let smallestTestedQuotient: number;
  let largestFoundPrimeFactor: number;
  
  let candidate: number= prime.next().value as number;
  do {
    if (0 === SUBJECT % candidate) {
      largestFoundPrimeFactor = candidate;
      console.log({largestFoundPrimeFactor,smallestTestedQuotient});
    }

    smallestTestedQuotient = SUBJECT / candidate;

    candidate = prime.next().value as number;

  } while (candidate < smallestTestedQuotient);
  console.log(`The largest prime factor of ${SUBJECT} is ${largestFoundPrimeFactor}`);
}

export default solution;
