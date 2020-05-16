import { compare } from "../lib/compare/mod.ts";

import { minBy } from "./minBy.ts";

export function min<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
  return minBy(compare, iter);
}
