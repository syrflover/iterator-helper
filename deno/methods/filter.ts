import { PredicateFn } from "../types/functions/mod.ts";

import { _curry } from "../lib/utils/mod.ts";

async function* _filter_impl_fn<T>(
  predicate: PredicateFn<T>,
  iter: AsyncIterable<T>,
) {
  for await (const elem of iter) {
    if (await predicate(elem)) {
      yield elem;
    }
  }
}

export interface Filter {
  <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
  <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const filter: Filter = _curry(_filter_impl_fn);
