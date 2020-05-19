import type { FoldFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { _curry, Curry2 } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/fold');

async function _fold_impl_fn<A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B> {
    logger.trace('fold()');
    let acc = await init;

    logger.debug('init        =', init);

    for await (const elem of iter) {
        acc = await fn(acc, elem);
        logger.debug('accumulator =', acc);
        logger.debug('element     =', elem);
    }

    return acc;
}

export interface Fold {
    <A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

// (b -> a -> b) -> b -> t a -> b
export const fold: Fold = _curry(_fold_impl_fn);
