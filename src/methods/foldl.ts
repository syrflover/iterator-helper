import { getLogger } from '../logger';

import { FoldlFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';

import { _curry, Curry2 } from '../lib/curry';
import { sequence } from '../lib/iterable';

const logger = getLogger('iterator/foldl');

async function _foldl_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldlFn<A, B>): Promise<B> {
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

export interface Foldl {
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldlFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

// (b -> a -> b) -> b -> t a -> b
export const _foldl: Foldl = _curry(<A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    logger.trace('_foldl()');
    return _foldl_impl_fn(iter, init, fn);
});
