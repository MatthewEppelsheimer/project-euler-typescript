import testFactory from "../utilities/test";
import { assertArrayMembersAreEqual } from "../utilities/array-assertions";

function getFactorsOf(product: number, options?: {DEBUG?:boolean}): number[] {
    const DEBUG = options?.DEBUG;

    DEBUG && console.log(`getFactorsOf(${product}) call`);
    if (1 === product) {
        return [1];
    }

    if (2 === product) {
        return [1,2];
    }

    const factors = [1,product];

    let factorCandidate: number = Math.floor(product / 2);
    while (factorCandidate > 1) {
        DEBUG && console.log({factorCandidate});
        if (-1 === factors.indexOf(factorCandidate) && 0 === product % factorCandidate) {
            factors.push(factorCandidate);
            factors.push(product / factorCandidate);
        }
        factorCandidate--;
    }

    // extractable for resuse
    const sortFnNumericAscending = (a:number,b:number):-1 | 0 | 1 =>a < b ? -1 : a === b ? 0 : 1

    // extractable for resuse
    const filternFnOnlyUnique = (value: any, index: number, array: any[]) => array.indexOf(value) === index;

    DEBUG && console.log({factorsSorted:factors.sort(sortFnNumericAscending)});
    return factors.filter(filternFnOnlyUnique).sort(sortFnNumericAscending);
}

function testGetFactorsOf(): void {
    const test = testFactory({ reportPassingTests: true });
    ([
        [1, [1]],
        [2,[1,2]],
        [3,[1,3]],
        [4,[1,2,4]],
        [5,[1,5]],
        [6,[1,2,3,6]],
        [7,[1,7]],
        [8,[1,2,4,8]],
        [9,[1,3,9]],
        [10,[1,2,5,10]],
        [11,[1,11]],
        [12,[1,2,3,4,6,12]],
        [13,[1,13]],
        [14,[1,2,7,14]],
        [15,[1,3,5,15]],
        [16,[1,2,4,8,16]],
        [17,[1,17]],
        [18,[1,2,3,6,9,18]],
        [19,[1,19]],
        [20,[1,2,4,5,10,20]],
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