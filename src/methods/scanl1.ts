import { getLogger } from '../logger.ts';

import { ScanlFn } from '../types/fn/scan.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

import { _scanl } from './scanl.ts';

const logger = getLogger('iterator/scanl1');

async function* _scanl1_impl_fn<T>(iter: AsyncIterable<T>, fn: ScanlFn<T, T>): AsyncIterable<T> {
    logger.info('_scanl1_impl_fn()');
    const { done, value: head } = await next_async(iter);

    if (done) {
        return;
    }

    yield* _scanl(fn, head, iter);
}

export interface Scanl1 {
    <T>(fn: ScanlFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ScanlFn<T, T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _scanl1: Scanl1 = _curry(<T>(fn: ScanlFn<T, T>, iter: AsyncIterable<T>) => {
    logger.info('_scanl1()');
    return _scanl1_impl_fn(iter, fn);
});
