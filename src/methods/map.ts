import { getLogger } from '../logger.ts';

import { MapFn } from '../types/fn/map.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/map');

async function* _map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, R>): AsyncIterable<R> {
    for await (const elem of iter) {
        const mapped = await fn(elem);

        logger.debug('element =', elem);
        logger.debug('mapped  =', mapped);

        yield mapped;
    }
}

export interface Map {
    <T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, R>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const _map: Map = _curry(<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>) => {
    logger.trace('_map()');
    return _map_impl_fn(iter, fn);
});
