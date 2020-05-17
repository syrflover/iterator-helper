import { getLogger } from '../logger.ts';

import { MapFn } from '../types/functions/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/map');

async function* _map_impl_fn<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<R> {
    logger.trace('map()');
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

export const map: Map = _curry(_map_impl_fn);
