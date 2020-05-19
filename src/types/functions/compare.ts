import type { Ord } from '../mod.ts';

export type CompareFn<T> = (a: T, b: T) => Ord | Promise<Ord>;
