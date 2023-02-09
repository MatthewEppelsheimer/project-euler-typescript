/**
 * Generate palindromic number composed from provided first half
 */
function palindromeFromFirstHalf(half: number): number {
    const arr = Array.from(half.toString());

    return parseInt(
        arr.reduce<string[]>((prev, curr, i, arr) => {
            prev[arr.length * 2 - 1 - i] = curr;
            return prev;
        }, [...arr]
        ).join(""),
        10);
}

/**
 * Generate palindromic numbers, beginning with one composed from provided first half
 */
export function* palindromeCountdown(startFirstHalf: number): Generator<number> {
    let count = startFirstHalf;
    while (count > 0) {
        yield palindromeFromFirstHalf(count);
        count--;
    }
}


/**
 * Determine if the input is a palindromic number (reads the same right-to-left as left-to-right).
 * 
 * Created for first attempt to solve Problem 4, now un-used.
 */
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

