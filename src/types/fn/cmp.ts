import { Ord } from '../ordering';

export type CompareFn<T> = (a: T, b: T) => Ord | Promise<Ord>;
