

import { pair, Pair } from '../types/mod';
import { PredicateFn } from '../types/functions/mod';

import { append, sequence } from '../lib/iterable/mod';
import { _curry } from '../lib/utils/mod';

import { fold } from './fold';



async function _partition_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>> {
    
    return fold(
        async ([left, right], elem) => {
            const condition = await fn(elem);

            if (condition) {
                return pair(append(elem, left), right);
            }
            return pair(left, append(elem, right));
        },
        pair(sequence<T>([]), sequence<T>([])),
        iter,
    );
}

export interface Partition {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
}

export const partition: Partition = _curry(_partition_impl_fn);
