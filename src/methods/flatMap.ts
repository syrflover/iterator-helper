import { getLogger } from '../logger.ts';

import { Flatten } from '../types/flatten.ts';
import { MapFn } from '../types/fn/map.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/flatMap');

async function* _flat_map_impl_fn<T, R extends Iterable<any> | AsyncIterable<any>>(
    iter: AsyncIterable<T>,
    fn: MapFn<T, R>,
): AsyncIterable<Flatten<R>> {
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

export const _flatMap: FlatMap = _curry(<T, R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>, iter: AsyncIterable<T>) => {
    logger.trace('_flatMap()');
    return _flat_map_impl_fn(iter, fn);
});
