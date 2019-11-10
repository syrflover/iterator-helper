import { getLogger } from '../logger.ts';

import { Flatten } from '../types/mod.ts';
import { MapFn } from '../types/fn/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = getLogger('methods/flatMap');

async function* _flat_map_impl_fn<T, R extends Iterable<any> | AsyncIterable<any>>(
    fn: MapFn<T, R>,
    iter: AsyncIterable<T>,
): AsyncIterable<Flatten<R>> {
    logger.trace('flatMap()');
    for await (const elem of iter) {
        const mapped = await fn(elem);

        logger.debug('element =', elem);
        logger.debug('mapped  =', mapped);

        yield* mapped as AsyncIterable<any>;
    }
}

export interface FlatMap {
    <T, R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<Flatten<R>>;
    <T, R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>): (iter: AsyncIterable<T>) => AsyncIterable<Flatten<R>>;
}

export const flatMap: FlatMap = _curry(_flat_map_impl_fn);
