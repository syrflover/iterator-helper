import { getLogger } from '../logger.ts';

import { ScanrFn } from '../types/fn/scan.ts';

import { next_async } from '../lib/iterable/next.ts';
import { initLast } from '../lib/iterable/initLast.ts';
import { prepend } from '../lib/iterable/prepend.ts';

import { _curry } from '../lib/curry.ts';

import { _scanr } from './scanr.ts';

const logger = getLogger('iterator/scanr1');

async function* _scanr1_impl_fn<T>(iter: AsyncIterable<T>, fn: ScanrFn<T, T>): AsyncIterable<T> {
    logger.trace('_scanr1_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    const [init, last] = await initLast(prepend(value, iter));

    yield* _scanr(fn, last!, init);
}

export interface Scanr1 {
    <T>(fn: ScanrFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ScanrFn<T, T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _scanr1: Scanr1 = _curry(<T>(fn: ScanrFn<T, T>, iter: AsyncIterable<T>) => {
    logger.trace('_scanr1()');
    return _scanr1_impl_fn(iter, fn);
});
