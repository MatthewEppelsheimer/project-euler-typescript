import { getFactorsOf } from "../utilities/factors";
import { filternFnOnlyUnique } from "../utilities/arrays";

// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

const CIRCUIT_BREAKER_STEPS = 100000000;
const DEBUG = false;
const HIGHEST_DIVISOR = 9;
const DEBUG_PROGRESS_REPORT_INTERVAL = CIRCUIT_BREAKER_STEPS / 10;

function solution(): void {
  let candidate: number = HIGHEST_DIVISOR * (HIGHEST_DIVISOR - 1); // start with smallest number that satisfies the two highest common factors

  let stepCount: number = 0;
  let debugLowestDivisorTested = HIGHEST_DIVISOR;

  do {
    if (DEBUG && 0 === candidate % DEBUG_PROGRESS_REPORT_INTERVAL) {
      console.log(`testing candidate ${candidate} at step count ${stepCount}`);
    }

    let knownDivisorsForCandidate: number[] = getFactorsOf(HIGHEST_DIVISOR);
    for (
      let testDivisor = HIGHEST_DIVISOR - 1;
      testDivisor > 0;
      testDivisor--
    ) {
      if (DEBUG && debugLowestDivisorTested > testDivisor) {
        debugLowestDivisorTested = testDivisor;
        console.log({
          candidate,
          lowestDivisorTested: debugLowestDivisorTested,
          knownDivisorsForCandidate,
        });
      }

      if (1 === testDivisor) {
        // all pass! we're done
        console.log(
          `The smallest positive number that is evenly divisible by all of the numbers from 1 to ${HIGHEST_DIVISOR} is ${candidate}`
        );
        return;
      }

      if (-1 !== knownDivisorsForCandidate.indexOf(testDivisor)) {
        // we already know this passes
        continue;
      }

      if (0 !== candidate % testDivisor) {
        break;
      }

      // reason about and save known divisors to skip them in future loops
      const complement = candidate / testDivisor;
      [
        testDivisor,
        ...(complement < HIGHEST_DIVISOR
          ? [complement, ...getFactorsOf(complement)]
          : []),
        ...getFactorsOf(testDivisor),
      ]
        .filter(filternFnOnlyUnique)
        .forEach((divisor) => {
          //  console.log(`push`);
          knownDivisorsForCandidate.push(divisor);
        });
    }
    candidate += HIGHEST_DIVISOR;
    stepCount++; // could derive this from candidate but this is more immediately clear
  } while (stepCount < CIRCUIT_BREAKER_STEPS);
  console.log(`Tripped circuit breaker after ${CIRCUIT_BREAKER_STEPS} steps`);
}

export default solution;

// I realized early that a number evenly divisible by a second number is also evenly divisible by the second number's factors. So looping through all divisors would waste compute cycles. I started by creating getFactorsOf(), implementing caching and recursion for performance efficiency. Then my first attempt at a solution worked (after debugging implementation): iterate candidate numbers by adding the highest even divisor (20), and for each, check divisors in decending order, breaking that loop as soon as one isn't an even divider.

// in hindsight getFactorsOf is probably not helping much, especially as very large candidates have large sets of factors, and the only ones that matter for this purpose are those less than or equal to the candidate (which is a small subset).

// I wonder if there's a more clever way to do this than my brute-force implementation, that exploits some kind of pattern in the set of [1..n]. I gave up on exploring this early because to investigate the patterns I needed to find the smallest solutions for even small _n_s like `7`, and it was easier to just implement this solution to generate even those in the first place.

// .... Now that I'm looking a bit further, it looks promising!

// 1 and 2: 2
// 1, 2, and 3: 6
// 1, 2, 3, and 4: 12 // not prime; lowest common factor of new number is 2; multiply last result by 2?
// 1, 2, 3, 4, 5: 60 // n is prime; interesting that it's previous solution multiplied by new n! coincidence?
// 1, 2, 3, 4, 5, 6: 60 // not prime, but divisor for previous
// 1, 2, 3, 4, 5, 6, 7: 420 // !!! again, this is a prime _n_ and the solution is _n-1_ solution multiplied by _n_!, like with n=5.
// 1, 2, 3, 4, 5, 6, 7, 8: 840 // !!! again, not prime, and solution is prev solution x 2!
// 1, 2, 3, 4, 5, 6, 7, 8, 9: 2520 // !!! again, not prime... but solution is prev solution x 3, which is n's greatest prime factor!
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10: 2520 // similar to n=6

// ... I need to stop ;-P
