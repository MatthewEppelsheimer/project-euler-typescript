import * as console from "console";

import { countdownFrom } from "../utilities/iterators";
import { palindromeCountdown } from "../utilities/palindromes";

const CIRCUIT_BREAKER_STEPS = 300;

// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

// Dev journal at bottom.

const LARGEST_PRODUCT_OF_TWO_FACTORS_WITH_THREE_DIGITS = 999 * 999;

function solution(): void {
  const palindrome = palindromeCountdown(999);
  let i = 0;
  while (true) {
    i++;
    if (i > CIRCUIT_BREAKER_STEPS) {
      console.log(`CB tripped after testing ${i} palindromes`);
      break;
    }

    const candidate = palindrome.next().value;

    if (candidate > LARGEST_PRODUCT_OF_TWO_FACTORS_WITH_THREE_DIGITS) {
      // console.log(`${candidate} skipped because too large`);
      continue;
    }

    let factors = countdownFrom(999);
    let testFactor: number

    do {
      testFactor = factors.next().value;
      if (0 === testFactor % 25) {
        // console.log({candidate, testFactor});

        // short cut every 25
        if (candidate/testFactor > testFactor) {
          // now we're testing repeats
          // console.log(`break with ${candidate/testFactor} > ${testFactor}`);
          break;
        }
      }

      if (0 !== candidate % testFactor) {
        // not a factor
        continue;
      }

      const secondFactor = candidate / testFactor;
      if (secondFactor > testFactor) {
        // now we're testing repeats
        // console.log(`break with ${secondFactor} > ${testFactor}`);
        break;
      }

      if (secondFactor > 99) {
        // winner
        console.log(
          `The largest palindrome made from the product of two 3-digit numbers is ${candidate}, with factors ${testFactor} and ${secondFactor}`
        )
        return;
      }
    } while (testFactor > 99);
  }
}

export default solution;

// First solution attempt was to generate products from factors, then check if they were palindromes. The challenge with this was determining if a found solution was the largest: I didn't crack the nut of how to generate factor pairs whose product would always be less than the previous.

// So I switched to generating large-to-small palindromes, and looking for factor pairs. 