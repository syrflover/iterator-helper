import { getLogger } from '../logger';

const logger = getLogger('iterator/chain');

async function* _chain_impl_fn<T>(iter: AsyncIterable<T>, other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): AsyncIterable<T> {
    logger.trace('_chain_impl_fn()');
    yield* iter;
    yield* other;
}

export function _chain<T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>) {
    logger.trace('_chain()');
    return _chain_impl_fn(iter, other);
}
