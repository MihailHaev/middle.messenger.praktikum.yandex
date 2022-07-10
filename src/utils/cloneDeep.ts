import { isObject, PlainObject } from './isObject';

export function cloneDeep<T extends object = object>(obj: T): PlainObject {
  if (isObject(obj)) {
    return Object.entries(obj).reduce(
      (accum, [key, value]) =>
        isObject(value) ? { ...accum, [key]: cloneDeep(value) } : { ...accum, [key]: value },
      {},
    );
  }

  if (Array.isArray(obj)) {
    return obj.reduce(
      (accum, value) => (isObject(value) ? [...accum, cloneDeep(value)] : [...accum, value]),
      [],
    );
  }

  return {};
}

// const objects = [{ 'a': 1 }, { 'b': 2 }];
// const deep = cloneDeep(objects);

// console.log(deep[0] === objects[0]); // => false
