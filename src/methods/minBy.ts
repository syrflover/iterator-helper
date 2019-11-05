import { getLogger } from '../logger';

import { CompareFn } from '../types/fn/cmp';

import { next_async } from '../lib/iterable/next';

import { minBy } from '../lib/cmp';
import { _curry } from '../lib/curry';

import { _foldl } from './foldl';

const logger = getLogger('iterator/minBy');

async function _min_by_impl_fn<T>(iter: AsyncIterable<T>, fn: CompareFn<T>): Promise<T | undefined> {
    logger.trace('_min_by_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl((acc, e) => minBy(acc, e, fn), value, iter);
}

export interface MinBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _minBy: MinBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_minBy()');
    return _min_by_impl_fn(iter, fn);
});
