import { CompareFn, KeyFn } from "../types/functions/mod.ts";

import { minBy } from "../lib/compare/mod.ts";
import { next_async } from "../lib/iterable/mod.ts";
import { _curry, Curry2 } from "../lib/utils/mod.ts";

import { fold } from "./fold.ts";

async function _min_by_key_impl_fn<T, K>(
  keyFn: KeyFn<T, K>,
  cmpFn: CompareFn<K>,
  iter: AsyncIterable<T>,
): Promise<T | undefined> {
  const { done, value } = await next_async(iter);

  if (done) {
    return;
  }

  return fold(async (acc, e) => minBy(keyFn, cmpFn, acc, e), value, iter);
}

export interface MinByKey {
  <T, K>(
    keyFn: KeyFn<T, K>,
    cmpFn: CompareFn<K>,
    iter: AsyncIterable<T>,
  ): Promise<T | undefined>;
  <T, K>(
    keyFn: KeyFn<T, K>,
    cmpFn: CompareFn<K>,
  ): (iter: AsyncIterable<T>) => Promise<T | undefined>;
  <T, K>(
    keyFn: KeyFn<T, K>,
  ): Curry2<CompareFn<K>, AsyncIterable<T>, Promise<T | undefined>>;
}

export const minByKey: MinByKey = _curry(_min_by_key_impl_fn);
