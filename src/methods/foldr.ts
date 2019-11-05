import { getLogger } from '../logger';

import { FoldrFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';

import { curry, Curry2 } from '../lib/curry';

const logger = getLogger('iterator/foldr');

async function _foldr_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldrFn<A, B>): Promise<B> {
    logger.trace('_foldr_impl_fn()');
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

export const _foldr: Foldr = curry(<A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    logger.trace('_foldr()');
    return _foldr_impl_fn(iter, init, fn);
});
