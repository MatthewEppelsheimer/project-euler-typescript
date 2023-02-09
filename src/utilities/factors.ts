import testFactory from "../utilities/test";
import { assertArrayMembersAreEqual } from "../utilities/array-assertions";

function getFactorsOf(product: number): number[] {
    if (1 === product) {
        return [1];
    }

    if (2 === product) {
        return [1,2];
    }

    return [];
}

function testGetFactorsOf(): void {
    const test = testFactory({ reportPassingTests: true });

    ([
        [1, [1]],
        [2,[1,2]]
    ] as [number, number[]][]).forEach((t) => {
        const [product, expected] = t;

        const actual = getFactorsOf(product);

        test<typeof getFactorsOf>(`factors of ${product}`,
            () => {
                assertArrayMembersAreEqual(expected, actual);
            }, actual);
    });
}

testGetFactorsOf();

export { getFactorsOf };