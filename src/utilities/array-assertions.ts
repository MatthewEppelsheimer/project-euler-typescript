export function assertArrayMembersAreEqual(
  arr1: Array<any>,
  arr2: Array<any>
): void {
  if (arr1.length !== arr2.length) {
    throw new Error(
      `arrays have unequal length:\n\narr1: ${JSON.stringify(
        arr1
      )}\narr2: ${JSON.stringify(arr2)}\n`
    );
  }
  arr1.forEach((val, index) => {
    if (arr2[index] !== val) {
      throw new Error(
        `arrays are not equal at index ${index}.\n\narr1[${index}]: ${
          arr1[index]
        }\narr2[${index}]: ${arr2[index]}\n\narr1: ${JSON.stringify(
          arr1
        )}\narr2: ${JSON.stringify(arr2)}\n`
      );
    }
    return true;
  }, true);
}
