import { MapFn } from "../types/functions/mod.ts";

import { _curry } from "../lib/utils/mod.ts";

async function* _map_impl_fn<T, R>(
  fn: MapFn<T, R>,
  iter: AsyncIterable<T>,
): AsyncIterable<R> {
  for await (const elem of iter) {
    const mapped = await fn(elem);

    yield mapped;
  }
}

export interface Map {
  <T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<R>;
  <T, R>(fn: MapFn<T, R>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const map: Map = _curry(_map_impl_fn);
