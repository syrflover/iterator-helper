import { getLogger } from '../logger.ts';

import { MapFn } from '../types/fn/map.ts';

import { Nullable } from '../types/nullable.ts';

import { isNull } from '../types/guard/isNull.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/filterMap');

async function* _filter_map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, Nullable<R>>): AsyncIterable<R> {
    for await (const elem of iter) {
        const mapped = await fn(elem);

        logger.debug('element =', elem);
        logger.debug('mapped  =', mapped);

        if (!isNull(mapped)) {
            yield mapped;
        }
    }
}

export interface FilterMap {
    <T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, Nullable<R>>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const _filterMap: FilterMap = _curry(<T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>) => {
    logger.trace('filterMap()');
    return _filter_map_impl_fn(iter, fn);
});
