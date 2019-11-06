import { getLogger } from '../logger.ts';

import { MapFn } from '../types/fn/map.ts';

import { Nullable } from '../types/nullable.ts';

import { isNull } from '../types/guard/isNull.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/findMap');

async function _find_map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, Nullable<R>>): Promise<R | undefined> {
    logger.info('_find_map_impl_fn()');
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

export const _findMap: FindMap = _curry(<T, R>(predicate: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>) => {
    logger.info('_findMap()');
    return _find_map_impl_fn(iter, predicate);
});
