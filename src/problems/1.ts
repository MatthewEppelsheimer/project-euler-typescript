import * as console from "console";

function solution() {
  let multiples: number[] = [];

  const ceiling: number = 1000;

  for (let i = 0; i < ceiling; i++) {
    if (0 === i % 3) {
      multiples.push(i);
      continue;
    }

    if (0 === i % 5) {
      multiples.push(i);
    }
  }

  const sumOfMultiples = multiples.reduce((prev, curr) => prev + curr, 0);

  console.log(
    `The sum of multiples of 3 or 5 under ${ceiling} is ${sumOfMultiples}`
  );
}

export default solution;
