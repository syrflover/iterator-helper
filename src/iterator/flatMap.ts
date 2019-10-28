import { getLogger } from '../logger';

import { Flatten } from '../types/flatten';
import { MapFn } from '../types/fn/map';

import { next_async } from '../lib/iterable/next';

import { _flatten } from './flatten';
import { _map } from './map';

const logger = getLogger('iterator/flatMap');

async function* _flat_map_impl_fn<T, R extends Iterable<any> | AsyncIterable<any>>(
    iter: AsyncIterable<T>,
    fn: MapFn<T, R>,
): AsyncIterable<Flatten<R>> {
    logger.trace('_flat_map_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    const mapped = await fn(value);

    yield* mapped as any;

    yield* _flat_map_impl_fn(iter, fn);
}

export function _flatMap<T, R extends Iterable<any> | AsyncIterable<any>>(fn: MapFn<T, R>, iter: AsyncIterable<T>) {
    logger.trace('_flatMap()');
    return _flat_map_impl_fn(iter, fn);
}
