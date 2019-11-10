import { getLogger } from '../logger.ts';

import { FoldlFn } from '../types/fn/mod.ts';

import { _curry, Curry2 } from '../lib/utils/mod.ts';

const logger = getLogger('methods/foldl');

async function _foldl_impl_fn<A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B> {
    logger.trace('foldl()');
    let acc = await init;

    logger.debug('init        =', init);

    for await (const elem of iter) {
        acc = await fn(acc, elem);
        logger.debug('accumulator =', acc);
        logger.debug('element     =', elem);
    }

    return acc;
}

export interface Foldl {
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldlFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

// (b -> a -> b) -> b -> t a -> b
export const foldl: Foldl = _curry(_foldl_impl_fn);
