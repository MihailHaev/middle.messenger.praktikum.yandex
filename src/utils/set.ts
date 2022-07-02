import { isObject, PlainObject } from './isObject';

export const set = (object: PlainObject, path: unknown, value: unknown): PlainObject | unknown => {
  if (path instanceof String || typeof path !== 'string') throw new Error('path must be string');
  if (!isObject(object)) return object;

  const pathArray: Array<string> = path.split('.');

  pathArray.reduceRight((accum: unknown, objKey: string, index): PlainObject => {
    if (!index) {
      // eslint-disable-next-line no-param-reassign
      object[objKey] = accum;
    }
    return { [objKey]: accum };
  }, value);

  return object;
};
