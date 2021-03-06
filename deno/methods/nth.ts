import { _curry } from "../lib/utils/mod.ts";

async function _nth_impl_fn<T>(
  n: number,
  iter: AsyncIterable<T>,
): Promise<T | undefined> {
  let current = 0;

  for await (const elem of iter) {
    if (n === current) {
      return elem;
    }
    current += 1;
  }
}

export interface Nth {
  <T>(n: number, iter: AsyncIterable<T>): Promise<T | undefined>;
  <T>(n: number): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const nth: Nth = _curry(_nth_impl_fn);
