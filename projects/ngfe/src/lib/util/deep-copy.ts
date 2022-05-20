/**
 * Deep copy objects and arrays.
 *
 * Copyright (c) Simeon Velichkov <simeonvelichkov@gmail.com>
 * https://github.com/simov/deep-copy
 */
export function deepCopy<T>(target: T): T {
  if (/number|string|boolean/.test(typeof target)) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }

  const copy: any = (target instanceof Array) ? [] : {};
  walk(target, copy);
  return copy;

  function walk<T>(
    target: T,
    copy: T,
  ) {
    for (const key in target) {
      const obj = target[key];
      if (obj instanceof Date) {
        add(copy, key, new Date(obj.getTime()));
      } else if (obj instanceof Function) {
        add(copy, key, obj);
      } else if (obj instanceof Array) {
        const last = add(copy, key, []);
        walk(obj, last);
      } else if (obj instanceof Object) {
        const last = add(copy, key, {});
        walk(obj, last);
      } else {
        add(copy, key, obj);
      }
    }
  }
}

/**
 * Adds a value to the copy object based on its type
 */
function add(
  copy: any,
  key: any,
  value: any,
) {
  if (copy instanceof Array) {
    copy.push(value);
    return copy[copy.length - 1];
  } else if (copy instanceof Object) {
    copy[key] = value;
    return copy[key];
  }
}
