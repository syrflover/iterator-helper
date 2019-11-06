import { getLogger } from '../logger.ts';

import { Pair, pair } from '../types/pair.ts';

import { toAsyncIterable } from '../lib/iterable.ts';
import { next_async } from '../lib/iterable/next.ts';
import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/zip');

async function* _zip_impl_fn<T, U>(iter: AsyncIterable<T>, other: AsyncIterable<U | Promise<U>>): AsyncIterable<Pair<T, U>> {
    logger.trace('_zip_impl_fn()');
    const { done: iter_done, value: iter_value } = await next_async(iter);
    const { done: other_done, value: other_value } = await next_async(other);

    if (iter_done || other_done) {
        return;
    }

    yield pair(iter_value, other_value as U);

    yield* _zip_impl_fn(iter, other);
}

export interface Zip {
    <T, U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>, iter: AsyncIterable<T>): AsyncIterable<Pair<T, U>>;
    <T, U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>): (iter: AsyncIterable<T>) => AsyncIterable<Pair<T, U>>;
}

export const _zip: Zip = _curry(<T, U>(other: Iterable<U | Promise<U>> | AsyncIterable<U | Promise<U>>, iter: AsyncIterable<T>) => {
    logger.trace('_zip()');
    const other_ = toAsyncIterable(other);
    return _zip_impl_fn(iter, other_);
});
