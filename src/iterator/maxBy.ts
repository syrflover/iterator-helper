import { getLogger } from '../logger';

import { CompareFn } from '../types/fn/cmp';

import { maxBy } from '../lib/cmp';
import { next_async } from '../lib/iterable/next';

import { _foldl } from './foldl';

const logger = getLogger('iterator/maxBy');

async function _max_by_impl_fn<T>(iter: AsyncIterable<T>, fn: CompareFn<T>): Promise<T | undefined> {
    logger.trace('_max_by_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl((acc, e) => maxBy(acc, e, fn), value, iter);
}

export function _maxBy<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_maxBy()');
    return _max_by_impl_fn(iter, fn);
}