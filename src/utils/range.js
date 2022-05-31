export function rangeRight(start, end, step) {
    return range(start, end, step, true);
}
  
export function range(start, end, step, isRight) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;

    const length = Math.abs((end - start) / step);

    const result = new Array(length).fill().map((a, i) => {
        if (!i) return start;
        start += step;
        return start;
    });

    return isRight ? result.reverse() : result;
}
  