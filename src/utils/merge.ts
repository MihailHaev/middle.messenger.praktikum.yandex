import { isObject, PlainObject } from './isObject';

export const merge = (lhs: PlainObject, rhs: PlainObject): PlainObject => {
  return Object.entries(lhs).reduce(
    (accum, [key, lhsValue]) => {
      const rhsValue = rhs[key];
      if (isObject(lhsValue) && isObject(rhsValue)) {
        return { ...accum, [key]: merge(lhsValue as PlainObject, rhsValue as PlainObject) };
      }
      if (isObject(rhsValue)) {
        return {
          ...accum,
          [key]: rhsValue,
        };
      }
      if (isObject(lhsValue)) {
        return {
          ...accum,
          [key]: lhsValue,
        };
      }
      return { ...accum, [key]: rhsValue || lhsValue };
    },
    { ...lhs, ...rhs },
  );
};
