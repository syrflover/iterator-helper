import { PredicateFn } from "../types/functions/mod.ts";

import { _curry } from "../lib/utils/mod.ts";

async function* _take_while_impl_fn<T>(
  predicate: PredicateFn<T>,
  iter: AsyncIterable<T>,
): AsyncIterable<T> {
  for await (const elem of iter) {
    const condition = await predicate(elem);

    if (!condition) {
      return;
    }

    yield elem;
  }
}

export interface TakeWhile {
  <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
  <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const takeWhile: TakeWhile = _curry(_take_while_impl_fn);
