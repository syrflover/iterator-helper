

import { EqualFn } from '../types/fn/equal.ts';

import { sequence } from '../lib/iterable.ts';

import { _curry } from '../lib/curry.ts';

import { _any } from './any.ts';



async function* _nub_by_impl_fn<T>(iter: AsyncIterable<T>, fn: EqualFn<T>): AsyncIterable<T> {
    const prev: T[] = [];

    for await (const elem of iter) {
        if (!(await _any((prev_elem) => fn(prev_elem, elem), sequence(prev)))) {
            yield elem;
            prev.push(elem);
        }
    }
}

export interface NubBy {
    <T>(fn: EqualFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: EqualFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _nubBy: NubBy = _curry(<T>(fn: EqualFn<T>, iter: AsyncIterable<T>) => {
    
    return _nub_by_impl_fn(iter, fn);
});
