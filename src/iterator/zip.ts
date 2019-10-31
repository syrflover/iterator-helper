import { getLogger } from '../logger';

import { Pair, pair } from '../types/pair';

import { toAsyncIterable } from '../lib/iterable';
import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/zip');

async function* _zip_impl_fn<T, U>(iter: AsyncIterable<T>, other: AsyncIterable<U>): AsyncIterable<Pair<T, U>> {
    logger.trace('_zip_impl_fn()');
    const { done: iter_done, value: iter_value } = await next_async(iter);
    const { done: other_done, value: other_value } = await next_async(other);

    if (iter_done || other_done) {
        return;
    }

    yield pair(iter_value, other_value);

    yield* _zip_impl_fn(iter, other);
}

export function _zip<T, U>(other: Iterable<U> | AsyncIterable<U>, iter: AsyncIterable<T>) {
    logger.trace('_zip()');
    const other_ = toAsyncIterable(other);
    return _zip_impl_fn(iter, other_);
}
