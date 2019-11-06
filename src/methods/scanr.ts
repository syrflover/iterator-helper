import { getLogger } from '../logger.ts';

import { ScanrFn } from '../types/fn/scan.ts';

import { next_async } from '../lib/iterable/next.ts';
import { prepend } from '../lib/iterable/prepend.ts';

import { _curry, Curry2 } from '../lib/curry.ts';

const logger = getLogger('iterator/scanr');

async function* _scanr_impl_fn<A, B>(iter: AsyncIterable<A>, state: B | Promise<B>, fn: ScanrFn<A, B>): AsyncIterable<B> {
    logger.trace('_scanr_impl_fn()');
    const st = await state;
    const { done, value } = await next_async(iter);

    logger.debug('state =', st);
    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        yield st;
        return;
    }

    const qs = _scanr_impl_fn(iter, st, fn);
    const { value: q } = await next_async(qs);

    yield* prepend(await fn(value, q), prepend(q, qs));
}

export interface Scanr {
    <A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B>;
    <A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => AsyncIterable<B>;
    <A, B>(fn: ScanrFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, AsyncIterable<B>>;
}

export const _scanr: Scanr = _curry(<A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    logger.trace('_scanr()');
    return _scanr_impl_fn(iter, init, fn);
});
