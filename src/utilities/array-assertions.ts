export function assertArrayMembersAreEqual(
  arr1: Array<any>,
  arr2: Array<any>
): void {
  arr1.forEach((val, index) => {
    if (arr2[index] !== val) {
      throw new Error(
        `arrays are not equal at index ${index}.\narr1[${index}]: ${arr1[index]}\narr2[${index}]: ${arr2[index]}`
      );
    }
    return true;
  }, true);
}
