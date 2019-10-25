import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

const logger = getLogger('iterator/chain');

async function* _chain_impl_fn<T>(iter: AsyncIterable<T>, other: Iterable<T> | AsyncIterable<T>) {
    logger.trace('_chain_impl_fn()');
    yield* iter;
    yield* other;
}

export function _chain<T>(iter: AsyncIterable<T>, other: Iterable<T> | AsyncIterable<T>) {
    logger.trace('_chain()');
    return new AsyncIterator_(_chain_impl_fn(iter, other));
}
