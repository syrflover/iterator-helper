import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';
import { pair, Pair } from '../types/pair.ts';

import { next_async } from '../lib/iterable/next.ts';
import { toAsyncIterable } from '../lib/iterable.ts';
import { append } from '../lib/iterable/append.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/partition');

async function _partition_impl_fn<T>(
    iter: AsyncIterable<T>,
    fn: PredicateFn<T>,
    left: AsyncIterable<T> = toAsyncIterable<T>([]),
    right: AsyncIterable<T> = toAsyncIterable<T>([]),
): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>> {
    logger.info('_partition_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(left, right);
    }

    const condition = await fn(value);

    if (condition) {
        return _partition_impl_fn(iter, fn, append(value, left), right);
    }

    return _partition_impl_fn(iter, fn, left, append(value, right));
}

export interface Partition {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>>;
}

export const _partition: Partition = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.info('_partition()');
    return _partition_impl_fn(iter, fn);
});
