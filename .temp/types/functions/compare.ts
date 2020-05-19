import { Ord } from '../mod';

export type CompareFn<T> = (a: T, b: T) => Ord | Promise<Ord>;
