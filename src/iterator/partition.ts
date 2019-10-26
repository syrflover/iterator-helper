import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { PredicateFn } from '../types/fn/predicate';
import { pair, Pair } from '../types/pair';

import { next_async } from '../lib/iterable/next';
import { toAsyncIterable } from '../lib/iterable';
import { append } from '../lib/iterable/append';

const logger = getLogger('iterator/partition');

async function _partition_impl_fn<T>(
    iter: AsyncIterable<T>,
    fn: PredicateFn<T>,
    left: AsyncIterable<T> = toAsyncIterable<T>([]),
    right: AsyncIterable<T> = toAsyncIterable<T>([]),
): Promise<Pair<AsyncIterable<T>, AsyncIterable<T>>> {
    logger.trace('_partition_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return pair(left, right);
    }

    const condition = await fn(value);

    if (condition) {
        return _partition_impl_fn(iter, fn, append(left, value), right);
    }

    return _partition_impl_fn(iter, fn, left, append(right, value));
}

export async function _partition<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_partition()');
    const [left, right] = await _partition_impl_fn(iter, fn);
    return (pair(new AsyncIterator_(left), new AsyncIterator_(right)) as unknown) as Pair<ToAsyncIterator<T>, ToAsyncIterator<T>>;
}