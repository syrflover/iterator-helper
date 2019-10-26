import { getLogger } from '../logger';

import { FoldFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/fold');

async function _foldl_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldFn<A, B>): Promise<B> {
    logger.trace('_foldl_impl_fn()');
    const acc = await accumulator;
    const { done, value: elem } = await next_async(iter);

    logger.debug('done        =', done);
    logger.debug('value       =', elem);
    logger.debug('accumulator =', acc);

    if (done) {
        return acc;
    }

    return _foldl_impl_fn(iter, await fn(acc, elem), fn);
}

// (b -> a -> b) -> b -> t a -> b
export function _foldl<A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) {
    logger.trace('_fold()');
    return _foldl_impl_fn(iter, init, fn);
}
