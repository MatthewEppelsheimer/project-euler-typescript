import * as console from "console";

import { primeIterator } from "../utilities/primes";

// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143?

// development notes at bottom of the file

function solution() {
  const SUBJECT = 600851475143;

  const prime = primeIterator();

  let smallestTestedQuotient: number;
  let largestFoundPrimeFactor: number;

  let candidate: number = prime.next().value as number;
  do {
    if (0 === SUBJECT % candidate) {
      largestFoundPrimeFactor = candidate;
      console.log({
        largestFoundPrimeFactor,
        smallestTestedQuotient: smallestTestedQuotient!,
      });
    }

    smallestTestedQuotient = SUBJECT / candidate;

    candidate = prime.next().value as number;
  } while (candidate < smallestTestedQuotient);
  console.log(
    `The largest prime factor of ${SUBJECT} is ${largestFoundPrimeFactor!}`
  );
}

export default solution;

// initial naive implementation was to calculate all prime numbers up to SUBJECT, and then check each one by one to see if it was a factor of the subject. Yikes! Learned just exactly how and why calculating prime factors is computationally difficult. Running for ~15 minutes, didn't even get past the prime number generation step. This approach rendered utilities/primes/calculate-prime-{factors,numbers}.ts, which as of now (with current solution) are unused (and not exported from utilities/primes).

// Realized a generator would be useful to break up the process (get one prime, check if we're done before getting the next) AND both reusable and testable in isolation.

// My approach: For each  prime, treat as `candidate`, store it if it's a factor, but whether it is or not, also store the quotient of the SUBJECT divided by candidate prime. The bigest challenge with this is knowing when you're done, and so you can stop computing primes... (The SUBJECT has only 5 prime factors, but many, many, many more prime numbers to compute between the 5th and the SUBJECT's values!) So as soon as the candidate is larger than the smallest stored quotient, we know the last stored prime factor is the largest, and we can stop.
