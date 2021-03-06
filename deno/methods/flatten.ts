import type { Flatten } from "../types/mod.ts";

import { isAsyncIterable, isIterable } from "../types/guards/mod.ts";

async function* _flatten_impl_fn<T>(
  iter: AsyncIterable<T>,
): AsyncIterable<Flatten<T>> {
  for await (const elem of iter) {
    if (isIterable(elem) || isAsyncIterable(elem)) {
      yield* elem;
    } else {
      yield elem as Flatten<T>;
    }
  }
}

export function flatten<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
  return _flatten_impl_fn(iter);
}
