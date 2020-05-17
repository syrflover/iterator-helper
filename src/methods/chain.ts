import { getLogger } from '../logger.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/chain');

async function* _chain_impl_fn<T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('chain()');
    yield* iter;
    yield* other;
}

export interface Chain {
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const chain: Chain = _curry(_chain_impl_fn);
