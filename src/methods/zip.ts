import { getLogger } from '../logger.ts';

import { Pair, pair } from '../types/pair.ts';

import { toAsyncIterable } from '../lib/iterable.ts';
import { next_async } from '../lib/iterable/next.ts';
import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/zip');

async function* _zip_impl_fn<T, U>(iter: AsyncIterable<T>, other: AsyncIterable<U | Promise<U>>): AsyncIterable<Pair<T, U>> {
    for await (const elem of iter) {
        const { done: other_done, value: other_value } = await next_async(other);

        if (other_done) {
            return;
        }

        yield pair(elem, other_value as U);
    }
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
