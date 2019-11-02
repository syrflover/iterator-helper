import { getLogger } from '../logger';

import { EqualFn } from '../types/fn/equal';

import { next_async } from '../lib/iterable/next';

import { _filter } from './filter';

const logger = getLogger('iterator/nubBy');

async function* _nub_by_impl_fn<T>(iter: AsyncIterable<T>, fn: EqualFn<T>): AsyncIterable<T> {
    logger.trace('_nub_by_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    yield value;

    yield* _nub_by_impl_fn(_filter(async (e) => !(await fn(value, e)), iter), fn);
}

export function _nubBy<T>(fn: EqualFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_nubBy()');
    return _nub_by_impl_fn(iter, fn);
}
