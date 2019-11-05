import { getLogger } from '../logger';

import { MapFn } from '../types/fn/map';

import { Nullable } from '../types/nullable';

import { isNull } from '../types/guard/isNull';

import { next_async } from '../lib/iterable/next';

import { _curry } from '../lib/curry';

const logger = getLogger('iterator/filterMap');

export async function* _filter_map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, Nullable<R>>): AsyncIterable<R> {
    logger.trace('filter_map_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    const mapped = await fn(value);

    if (!isNull(mapped)) {
        yield mapped;
    }

    yield* _filter_map_impl_fn(iter, fn);
}

export interface FilterMap {
    <T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, Nullable<R>>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const _filterMap: FilterMap = _curry(<T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>) => {
    logger.trace('filterMap()');
    return _filter_map_impl_fn(iter, fn);
});
