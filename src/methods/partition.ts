import type { PredicateFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { pair, Pair } from '../types/mod.ts';

import { append, sequence } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/partition');

async function _partition_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>> {
    logger.trace('partition()');
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
