function* countdownFrom(start: number): Generator<number, number> {
    let count = start;
    while (count > 0) {
        yield count;
        count--;
    }
    return count;
}

export { countdownFrom };
