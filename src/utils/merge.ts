import { isObject } from './isObject';

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
      return { ...accum, [key]: typeof rhsValue !== 'undefined' ? rhsValue : lhsValue };
    },
    { ...lhs, ...rhs },
  );
};

// const lhs = {a: {b: 1}};
// const rhs = {a: {c: 2}};

// const result = {...lhs, ...rhs} // {a: {c: 2}}
