import { getLogger } from '../logger.ts';

import { ScanlFn } from '../types/fn/mod.ts';

import { _curry, Curry2 } from '../lib/utils/mod.ts';

const logger = getLogger('methods/scanl');

async function* _scanl_impl_fn<A, B>(fn: ScanlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B> {
    logger.trace('scanl()');
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

export const scanl: Scanl = _curry(_scanl_impl_fn);
