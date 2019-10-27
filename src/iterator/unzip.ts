import { getLogger } from '../logger';

import { Pair } from '../types/pair';

import { next_async } from '../lib/iterable/next';
import { _partition } from './partition';
import { toAsyncIterable } from '../lib/iterable';
import { append } from '../lib/iterable/append';

const logger = getLogger('iterator/unzip');

async function _unzip_impl_fn<T, U>(
    iter: AsyncIterable<Pair<T, U>>,
    left_iter: AsyncIterable<T> = toAsyncIterable<T>([]),
    right_iter: AsyncIterable<U> = toAsyncIterable<U>([]),
): Promise<Pair<AsyncIterable<T>, AsyncIterable<U>>> {
    logger.trace('_unzip_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return [left_iter, right_iter];
    }

    const [left, right] = value;

    return _unzip_impl_fn(iter, append(left, left_iter), append(right, right_iter));
}

export function _unzip<T, U>(iter: AsyncIterable<Pair<T, U>>) {
    logger.trace('_unzip()');
    return _unzip_impl_fn(iter);
}
