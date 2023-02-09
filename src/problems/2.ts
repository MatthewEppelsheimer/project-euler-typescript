function solution() {
  const terms: number[] = [1, 2];

  while (terms[terms.length - 1]! <= 4000000) {
    const ultimate = terms[terms.length - 1];
    const penultimate = terms[terms.length - 2];
    terms.push(ultimate! + penultimate!);
    // console.log(terms[terms.length-1]);
  }

  const sumOfEvenTerms = terms.reduce(
    (prev, curr) => (0 === curr % 2 ? prev + curr : prev),
    0
  );

  // console.log(terms)

  console.log(
    `The sum of even Fibonacci terms whose values do not exceed four million is ${sumOfEvenTerms}`
  );
}

export default solution;
