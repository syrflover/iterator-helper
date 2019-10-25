import { getLogger } from '../logger';

import { isArrayLike } from '../types/guard/isArrayLike';
import { isPromise } from '../types/guard/isPromise';

import { next } from '../iterator/lib/next';

const logger = getLogger('lib/iterable');

export function* toIterable<T>(iter: T[]): Iterable<T> {
    logger.trace('toIterable()');
    yield* iter;
}

export function toAsyncIterable<T>(
    iter: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>> | Promise<AsyncIterable<T>>,
): AsyncIterableIterator<T> {
    logger.trace('toAsyncIterable()');

    if (isPromise(iter)) {
        return (async function*() {
            const iter_ = await iter;
            const iter__ = isArrayLike(iter_) ? toIterable(iter_) : iter_;
            yield* iter__;
        })();
    }

    const iter_ = isArrayLike(iter) ? toIterable(iter) : iter;

    return {
        [Symbol.asyncIterator]() {
            logger.trace('toAsyncIterable()', '[Symbol.asyncIterator]()');
            return this;
        },
        async next() {
            logger.trace('toAsyncIterable()', 'next()');

            const { done, value } = await next(iter_);

            logger.debug('toAsyncIterable()', 'done  =', done);
            logger.debug('toAsyncIterable()', 'value =', value);

            return { done, value };
        },
    };
}
