import type { CompareFn } from "../types/functions/mod.ts";

import { _curry, id } from "../lib/utils/mod.ts";

import { maxByKey } from "./maxByKey.ts";

export interface MaxBy {
  <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
  <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const maxBy: MaxBy = _curry(
  <T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    return maxByKey(id, fn, iter);
  },
);
