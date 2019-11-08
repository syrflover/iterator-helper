import { isArrayLikeOrString } from '../types/guard/isArrayLikeOrString.ts';

export function* toIterable<T>(iter: Iterable<T>): Iterable<T> {
    yield* iter;
}

export function toAsyncIterable<T>(
    iter: Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>> | Promise<AsyncIterable<T>>,
): AsyncIterable<T> {
    const iter_ = (async function*() {
        const iter__ = await iter;
        const iter___ = isArrayLikeOrString(iter__) ? toIterable(iter__) : iter__;
        yield* iter___;
    })();

    return {
        async *[Symbol.asyncIterator]() {
            yield* iter_;
        },
    };
}

/**
 * as toAsyncIterable
 */
export const sequence = toAsyncIterable;
