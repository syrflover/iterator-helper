import { Pair, pair } from "../types/mod.ts";

import { next_async, sequence } from "../lib/iterable/mod.ts";
import { _curry } from "../lib/utils/mod.ts";

async function* _zip_impl_fn<T, U>(
  other: AsyncIterable<U | Promise<U>>,
  iter: AsyncIterable<T>,
): AsyncIterable<Pair<T, U>> {
  for await (const elem of iter) {
    const { done: other_done, value: other_value } = await next_async(other);

    if (other_done) {
      return;
    }

    yield pair(elem, other_value as U);
  }
}

export interface Zip {
  <T, U>(
    other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>,
    iter: AsyncIterable<T>,
  ): AsyncIterable<Pair<T, U>>;
  <T, U>(
    other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>,
  ): (iter: AsyncIterable<T>) => AsyncIterable<Pair<T, U>>;
}

export const zip: Zip = _curry(
  <T, U>(
    other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>,
    iter: AsyncIterable<T>,
  ) => {
    const other_ = sequence(other);
    return _zip_impl_fn(other_, iter);
  },
);
