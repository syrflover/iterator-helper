import { getLogger } from '../logger.ts';

import { ScanlFn } from '../types/fn/scan.ts';

import { _curry, Curry2 } from '../lib/curry.ts';

const logger = getLogger('iterator/scanl');

async function* _scanl_impl_fn<A, B>(iter: AsyncIterable<A>, init: B | Promise<B>, fn: ScanlFn<A, B>): AsyncIterable<B> {
    let state = await init;

    yield state;

    for await (const elem of iter) {
        state = await fn(state, elem);
        yield state;
    }
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
