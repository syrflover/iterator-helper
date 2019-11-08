import { EP } from './promise.ts';

export type Flatten<T> = T extends Iterable<infer E> | AsyncIterable<infer E> ? EP<E> : T;
