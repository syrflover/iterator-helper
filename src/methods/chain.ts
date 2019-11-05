import { getLogger } from '../logger';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/chain');

async function* _chain_impl_fn<T>(iter: AsyncIterable<T>, other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): AsyncIterable<T> {
    logger.trace('_chain_impl_fn()');
    yield* iter;
    yield* other;
}

export interface Chain {
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _chain: Chain = curry(<T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>) => {
    logger.trace('_chain()');
    return _chain_impl_fn(iter, other);
});
