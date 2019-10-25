import { getLogger } from '../logger';

import { FoldFn } from '../types/fn/fold';

const logger = getLogger('iterator/fold');

async function _foldl_impl_fn<A, B>(
    fn: FoldFn<A, B>,
    iter: AsyncIterable<A>,
    accumulator: B | Promise<B>,
): Promise<B> {
    logger.trace('_foldl_impl_fn()');
    const acc = await accumulator;
    const it = iter[Symbol.asyncIterator]();
    const { done, value: elem } = await it.next();

    logger.debug('done        =', done);
    logger.debug('value       =', elem);
    logger.debug('accumulator =', acc);

    if (done) {
        return acc;
    }

    return _foldl_impl_fn(fn, iter, await fn(acc, elem));
}

// (b -> a -> b) -> b -> t a -> b
export function _foldl<A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) {
    logger.trace('_fold()');
    return _foldl_impl_fn(fn, iter, init);
}
