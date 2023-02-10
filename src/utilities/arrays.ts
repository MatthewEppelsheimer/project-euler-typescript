function filterFnFactoryMaxValue(
  maxValue: number
): (value: number, index: number, array: number[]) => boolean {
  return (value: number, _i: number, _a: number[]): boolean =>
    value <= maxValue;
}

function filternFnOnlyUnique(value: any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}

function sortFnNumericAscending(a: number, b: number): -1 | 0 | 1 {
  return a < b ? -1 : a === b ? 0 : 1;
}

export { filterFnFactoryMaxValue, filternFnOnlyUnique, sortFnNumericAscending };
