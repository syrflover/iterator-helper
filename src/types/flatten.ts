import { EP } from './promise';

export type Flatten<T> = T extends Iterable<infer E> | AsyncIterable<infer E> ? EP<E> : T;
