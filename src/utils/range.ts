/* eslint-disable no-param-reassign */
// eslint-disable-next-line max-params
export function range(start: number, end: number, step: number, isRight: boolean): Array<number> {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const defaultStep = start < end ? 1 : -1;

  step = step === undefined ? defaultStep : step;

  const length = Math.abs((end - start) / step);

  const result = new Array(length).fill('').map((_a, i) => {
    if (!i) return start;
    start += step;
    return start;
  });

  return isRight ? result.reverse() : result;
}

export function rangeRight(start: number, end: number, step: number): Array<number> {
  return range(start, end, step, true);
}
