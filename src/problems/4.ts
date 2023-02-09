import * as console from "console";

// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

function isPalindrome(candidate: number): boolean {
  const arr = Array.from(candidate.toString(10));
  let i = 0;
  while (i < arr.length - 1 - i) {
    // console.log(`comparing ${arr[i]} with ${arr[arr.length - 1 - i]}`);
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
    i++;
  }
  return true;
}

function* countdownFrom(start: number): Generator<number, number> {
  let count = start;
  while (count > 0) {
    yield count;
    count--;
  }
  return count;
}

function* factorPair(): Generator<[number, number]> {
  // algorithm:
  //    if first = second, reset first and derement second; else decrement first
  //    result:
  // yield [999, 999]; first = second; reset first and decrement second
  // yield [999, 998]; first != second; decrement first
  // yield [998, 998]; first = second; reset first and decrement second
  // yield [999, 997];
  // yield [998, 997];
  // yield [999, 996];
  // yield [998, 996];
  // yield [997, 996];
  // yield [996,996];

  let firstCountdown: Generator<number, number> = countdownFrom(999);
  const resetFirstCounter = (): void => {
    firstCountdown = countdownFrom(999);
  };

  const secondCountdown: Generator<number> = countdownFrom(999);

  let first: number = firstCountdown.next().value;
  let second: number = secondCountdown.next().value;

  while (true) {
    yield [first, second];
    if (first === second) {
      resetFirstCounter();
      first = firstCountdown.next().value;
      second = secondCountdown.next().value;
    } else {
      first = firstCountdown.next().value;
    }
  }
}

const ABORT = false;
const CIRCUIT_BREAKER_STEPS = 10;

function solutionAttempt1(): void {
  if (ABORT) {
    console.log(`aborted`);
    return;
  }

  let answer = null;
  let answerFactors;
  const candidateFactors = factorPair();

  let debugLastProduct: number;

  let i = 0;
  while (answer === null && i < CIRCUIT_BREAKER_STEPS) {
    const c = candidateFactors.next().value;
    const product = c[0] * c[1];

    console.log({ first: c[0], second: c[1], product });
    if (undefined !== debugLastProduct! && debugLastProduct < product) {
      debugger;
    }
    debugLastProduct = product;

    if (isPalindrome(product)) {
      answer = product;
      answerFactors = c;
    }
    i++;
  }

  console.log(
    undefined === answerFactors
      ? `Aborted by circuit breaker after ${i} steps`
      : `The largest palindrome made from the product of two 3-digit numbers is ${answer}, with factors ${answerFactors[0]} and ${answerFactors[1]}`
  );
}

export default solutionAttempt1;
