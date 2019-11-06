import { getLogger } from '../logger.ts';

import { isArrayLikeOrString } from '../types/guard/isArrayLikeOrString.ts';

import { next_async } from './iterable/next.ts';

const logger = getLogger('lib/iterable');

export function* toIterable<T>(iter: Iterable<T>): Iterable<T> {
    logger.trace('toIterable()');
    yield* iter;
}

export function toAsyncIterable<T>(
    iter: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>> | Promise<AsyncIterable<T>>,
): AsyncIterableIterator<T> {
    logger.trace('toAsyncIterable()');

    const iter_ = (async function*() {
        const iter__ = await iter;
        const iter___ = isArrayLikeOrString(iter__) ? toIterable(iter__) : iter__;
        yield* iter___;
    })();

    logger.debug('toAsyncIterable()', 'iter_  =', iter_);

    return {
        [Symbol.asyncIterator]() {
            logger.trace('toAsyncIterable()', '[Symbol.asyncIterator]()');
            return this;
        },
        async next() {
            logger.trace('toAsyncIterable()', 'next()');

            const { done, value } = await next_async(iter_);

            logger.debug('toAsyncIterable()', 'done  =', done);
            logger.debug('toAsyncIterable()', 'value =', value);

            return { done, value };
        },
    };
}

/**
 * as toAsyncIterable
 */
export const sequence = toAsyncIterable;
