import { getLogger } from '../logger';

import { MapFn } from '../types/fn/map';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/map');

async function* _map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, R>): AsyncIterable<R> {
    logger.trace('_map_impl_fn()');
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

export const _map: Map = curry(<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>) => {
    logger.trace('_map()');
    return _map_impl_fn(iter, fn);
});
