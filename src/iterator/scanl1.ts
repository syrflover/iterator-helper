import { getLogger } from '../logger';

import { ScanlFn } from '../types/fn/scan';

import { next_async } from '../lib/iterable/next';

import { _scanl } from './scanl';

const logger = getLogger('iterator/scanl1');

async function* _scanl1_impl_fn<T>(iter: AsyncIterable<T>, fn: ScanlFn<T, T>): AsyncIterable<T> {
    logger.trace('_scanl1_impl_fn()');
    const { done, value: head } = await next_async(iter);

    if (done) {
        return;
    }

    yield* _scanl(fn, head, iter);
}

export function _scanl1<T>(fn: ScanlFn<T, T>, iter: AsyncIterable<T>) {
    logger.trace('_scanl1()');
    return _scanl1_impl_fn(iter, fn);
}