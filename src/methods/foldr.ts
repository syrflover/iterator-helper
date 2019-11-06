import { getLogger } from '../logger.ts';

import { FoldrFn } from '../types/fn/fold.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry, Curry2 } from '../lib/curry.ts';

const logger = getLogger('iterator/foldr');

async function _foldr_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldrFn<A, B>): Promise<B> {
    logger.info('_foldr_impl_fn()');
    const acc = await accumulator;
    const { done, value } = await next_async(iter);

    logger.debug('done        =', done);
    logger.debug('value       =', value);
    logger.debug('accumulator =', acc);

    if (done) {
        return acc;
    }

    return fn(value, await _foldr_impl_fn(iter, acc, fn));
}

export interface Foldr {
    <A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldrFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

export const _foldr: Foldr = _curry(<A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    logger.info('_foldr()');
    return _foldr_impl_fn(iter, init, fn);
});
