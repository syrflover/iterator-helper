import { getLogger } from '../logger';

import { FoldlFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';

import { _curry } from '../lib/curry';

import { _foldl } from './foldl';

const logger = getLogger('iterator/foldl1');

async function _foldl1_impl_fn<T>(iter: AsyncIterable<T>, fn: FoldlFn<T, T>) {
    logger.trace('_foldl1_impl_fn()');
    const { done, value: head } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', head);

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return _foldl(fn, head, iter);
}

export interface Foldl1 {
    <T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>): Promise<T>;
    <T>(fn: FoldlFn<T, T>): (iter: AsyncIterable<T>) => Promise<T>;
}

export const _foldl1: Foldl1 = _curry(<T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>) => {
    logger.trace('_foldl1()');
    return _foldl1_impl_fn(iter, fn);
});
