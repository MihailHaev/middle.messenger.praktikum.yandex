/* eslint-disable no-continue */
import { isObject, PlainObject, isArrayOrObject } from './isObject';

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isObject(value) !== isObject(rightValue)) {
        return false;
      }
      if (isEqual(value as PlainObject, rightValue as PlainObject)) {
        continue;
      }

      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
};

// isEqual(a, b); // true
// isEqual({ a: 1 }, {a: 2}); // false
// isEqual({ b: 1 }, {a: 2}); // false
// isEqual({ b: 1 }, {a: 1}); // false
