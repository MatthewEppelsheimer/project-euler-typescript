import testFactory from "../utilities/test";
import { assertArrayMembersAreEqual } from "../utilities/array-assertions";

const factorCache = new Map<number, number[]>();

function getFactorsOf(product: number, options?: { DEBUG?: boolean }): number[] {
    const DEBUG = options?.DEBUG;
    DEBUG && console.log(`getFactorsOf(${product}) call`);

    const cached = factorCache.get(product)
    if (undefined !== cached) {
        return cached;
    }

    if (1 === product) {
        const factors = [1];
        DEBUG && console.log({ factors });
        factorCache.set(product, factors);
        return factors;
    }

    if (2 === product) {
        const factors = [1, 2];
        DEBUG && console.log({ factors });
        factorCache.set(product, factors);
        return factors;
    }

    const factors = [1, product];

    let factorCandidate: number = Math.floor(product / 2);
    while (factorCandidate > 1) {
        DEBUG && console.log({ factorCandidate });
        if (-1 === factors.indexOf(factorCandidate) && 0 === product % factorCandidate) {
            factors.push(factorCandidate);
            const complementFactor = product / factorCandidate;
            factors.push(complementFactor);

            // recurse to add factors' factors, taking advantage of the cache for efficiency
            [
                ...getFactorsOf(factorCandidate),
                ...getFactorsOf(complementFactor)
            ].forEach(subFactor => { factors.push(subFactor); });

        }
        factorCandidate--;
    }

    // extractable for resuse
    const sortFnNumericAscending = (a: number, b: number): -1 | 0 | 1 => a < b ? -1 : a === b ? 0 : 1
    // extractable for resuse
    const filternFnOnlyUnique = (value: any, index: number, array: any[]) => array.indexOf(value) === index;

    const normalized = factors.filter(filternFnOnlyUnique).sort(sortFnNumericAscending);

    DEBUG && console.log({ factors: normalized });
    factorCache.set(product, normalized);
    return normalized;
}

function testGetFactorsOf(): void {
    const test = testFactory();

    ([
        [1, [1]],
        [2, [1, 2]],
        [3, [1, 3]],
        [4, [1, 2, 4]],
        [5, [1, 5]],
        [6, [1, 2, 3, 6]],
        [7, [1, 7]],
        [8, [1, 2, 4, 8]],
        [9, [1, 3, 9]],
        [10, [1, 2, 5, 10]],
        [11, [1, 11]],
        [12, [1, 2, 3, 4, 6, 12]],
        [13, [1, 13]],
        [14, [1, 2, 7, 14]],
        [15, [1, 3, 5, 15]],
        [16, [1, 2, 4, 8, 16]],
        [17, [1, 17]],
        [18, [1, 2, 3, 6, 9, 18]],
        [19, [1, 19]],
        [20, [1, 2, 4, 5, 10, 20]],
    ] as [number, number[]][]).forEach((t) => {
        const [product, expected] = t;

        const actual = getFactorsOf(product);

        test<typeof getFactorsOf>(`factors of ${product}`,
            () => {
                assertArrayMembersAreEqual(expected, actual);
            }, actual);
    });

    {
        factorCache.clear();
        getFactorsOf(1);
        const cached = factorCache.get(1);

        test<typeof getFactorsOf>(`caches return values`, () => {
            const expected = [1];
            try {
                assertArrayMembersAreEqual(expected, cached || []);
            } catch (e: unknown) {
                throw new Error(`cache miss:\n${(e as Error).message}`);
            }
        }, cached!)

        factorCache.clear();
    }

    {
        // expoit cache access, and expect use of an injected nonsense value
        factorCache.clear();
        const dummyCacheHit = [-2];
        factorCache.set(1, dummyCacheHit);
        const actual = getFactorsOf(1);

        test<typeof getFactorsOf>(`uses cached values`, () => {
            assertArrayMembersAreEqual(dummyCacheHit, actual);
        }, actual);

        factorCache.clear();
    }


    {
        // test of recursion:
        // exploit cache access, expect cache set for a factor's sub-factors
        factorCache.clear();
        const _actual = getFactorsOf(4);
        test<typeof getFactorsOf>(`calculates factors of factors`, () => {
            try {
                assertArrayMembersAreEqual(factorCache.get(2) || [], [1, 2]);
            } catch (e: unknown) {
                throw new Error(`cache miss:\n${(e as Error).message}`);
            }
        }, _actual);

        factorCache.clear();
    }

    {
        // test of recursion:
        // exploit cache access, expect use of an injected nonsense value for a factor of factors
        factorCache.clear();
        const dummyCacheHit = [-2];
        factorCache.set(2, dummyCacheHit);
        const actual = getFactorsOf(4);

        test<typeof getFactorsOf>(`uses cached factors of factors`, () => {
            assertArrayMembersAreEqual([-2, 1, 2, 4], actual);
        }, actual);

        factorCache.clear();
    }
}

testGetFactorsOf();

export { getFactorsOf };