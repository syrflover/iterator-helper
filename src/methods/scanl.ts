import { getLogger } from '../logger.ts';

import { ScanlFn } from '../types/fn/scan.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry, Curry2 } from '../lib/curry.ts';

const logger = getLogger('iterator/scanl');

async function* _scanl_impl_fn<A, B>(iter: AsyncIterable<A>, state: B | Promise<B>, fn: ScanlFn<A, B>): AsyncIterable<B> {
    logger.trace('_scanl_impl_fn()');
    const st = await state;
    const { done, value } = await next_async(iter);

    logger.debug('state =', st);
    logger.debug('done  =', done);
    logger.debug('value =', value);

    yield st;

    if (done) {
        return;
    }

    yield* _scanl_impl_fn(iter, await fn(st, value), fn);
}

export interface Scanl {
    <A, B>(fn: ScanlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B>;
    <A, B>(fn: ScanlFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => AsyncIterable<B>;
    <A, B>(fn: ScanlFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, AsyncIterable<B>>;
}

export const _scanl: Scanl = _curry(<A, B>(fn: ScanlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    logger.trace('_scanl()');
    return _scanl_impl_fn(iter, init, fn);
});
