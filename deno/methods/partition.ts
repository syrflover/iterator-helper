

import { PredicateFn } from '../types/fn/predicate.ts';
import { pair, Pair } from '../types/pair.ts';

import { sequence } from '../lib/iterable.ts';
import { append } from '../lib/iterable/append.ts';

import { _curry } from '../lib/curry.ts';

import { _foldl } from './foldl.ts';



async function _partition_impl_fn<T>(
    iter: AsyncIterable<T>,
    fn: PredicateFn<T>,
): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>> {
    return _foldl(async ([left, right], elem) => {
        const condition = await fn(elem);

        if (condition) {
            return pair(append(elem, left), right);
        }
        return pair(left, append(elem, right));
    }, pair(sequence<T>([]), sequence<T>([])), iter);
}

export interface Partition {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
}

export const _partition: Partition = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    
    return _partition_impl_fn(iter, fn);
});
