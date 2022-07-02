export function last(list: Array<unknown>): unknown {
  return Array.isArray(list) ? list[list.length - 1] : undefined;
}
