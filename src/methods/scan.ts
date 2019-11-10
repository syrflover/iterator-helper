import { getLogger } from '../logger.ts';

import { ScanFn } from '../types/fn/mod.ts';

import { _curry, Curry2 } from '../lib/utils/mod.ts';

const logger = getLogger('methods/scan');

async function* _scan_impl_fn<A, B>(fn: ScanFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B> {
    logger.trace('scanl()');
    let state = await init;

    yield state;

    for await (const elem of iter) {
        state = await fn(state, elem);
        yield state;
    }
}

export interface Scan {
    <A, B>(fn: ScanFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B>;
    <A, B>(fn: ScanFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => AsyncIterable<B>;
    <A, B>(fn: ScanFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, AsyncIterable<B>>;
}

export const scan: Scan = _curry(_scan_impl_fn);
