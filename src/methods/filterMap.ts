import type { Nullable } from '../types/mod.ts';
import type { MapFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { isNull } from '../types/guards/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/filterMap');

async function* _filter_map_impl_fn<T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): AsyncIterable<R> {
    logger.trace('filterMap()');
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

export const filterMap: FilterMap = _curry(_filter_map_impl_fn);
