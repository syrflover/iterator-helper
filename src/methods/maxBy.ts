import { getLogger } from '../logger.ts';

import { CompareFn } from '../types/fn/cmp.ts';

import { next_async } from '../lib/iterable/next.ts';

import { maxBy } from '../lib/cmp.ts';
import { _curry } from '../lib/curry.ts';
import { id } from '../lib/id.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/maxBy');

async function _max_by_impl_fn<T>(iter: AsyncIterable<T>, fn: CompareFn<T>): Promise<T | undefined> {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl((acc, e) => maxBy(id, fn, acc, e), value, iter);
}

export interface MaxBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _maxBy: MaxBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_maxBy()');
    return _max_by_impl_fn(iter, fn);
});
