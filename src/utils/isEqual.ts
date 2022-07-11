import { isObject, PlainObject } from './isObject';

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, leftValue] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isObject(leftValue) && isObject(rightValue)) {
      if (!isEqual(leftValue, rightValue)) return false;
    }

    if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [index, value] of leftValue.entries()) {
        if (value !== rightValue[index]) return false;
      }
    }

    if (leftValue !== rightValue) {
      return false;
    }
  }

  return true;
};
