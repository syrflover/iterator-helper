import { getLogger } from '../logger.ts';

import { MapFn } from '../types/fn/map.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/map');

async function* _map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, R>): AsyncIterable<R> {
    logger.info('_map_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done   =', done);
    logger.debug('value  =', value);

    if (done) {
        return;
    }

    const mapped = await fn(value);

    logger.debug('mapped =', mapped);

    yield mapped;

    yield* _map_impl_fn(iter, fn);
}

export interface Map {
    <T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, R>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const _map: Map = _curry(<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>) => {
    logger.info('_map()');
    return _map_impl_fn(iter, fn);
});
