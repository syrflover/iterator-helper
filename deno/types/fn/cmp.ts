import { Ord } from '../ordering.ts';

export type CompareFn<T> = (a: T, b: T) => Ord | Promise<Ord>;
