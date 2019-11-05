import { getLogger } from '../logger';

import { MapFn } from '../types/fn/map';

import { Nullable } from '../types/nullable';

import { isNull } from '../types/guard/isNull';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/findMap');

async function _find_map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, Nullable<R>>): Promise<R | undefined> {
    logger.trace('_find_map_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return;
    }

    const mapped = await fn(value);

    logger.debug('mapped =', mapped);

    if (!isNull(mapped)) {
        return mapped;
    }

    return _find_map_impl_fn(iter, fn);
}

export interface FindMap {
    <T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): Promise<R | undefined>;
    <T, R>(fn: MapFn<T, Nullable<R>>): (iter: AsyncIterable<T>) => Promise<R | undefined>;
}

export const _findMap: FindMap = curry(<T, R>(predicate: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>) => {
    logger.trace('_findMap()');
    return _find_map_impl_fn(iter, predicate);
});
