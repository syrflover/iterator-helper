import { getLogger } from '../logger';

import { ScanrFn } from '../types/fn/scan';

import { next_async } from '../lib/iterable/next';
import { initLast } from '../lib/iterable/initLast';
import { prepend } from '../lib/iterable/prepend';

import { _scanr } from './scanr';
import { _reverse } from './reverse';

const logger = getLogger('iterator/scanr1');

async function* _scanr1_impl_fn<T>(iter: AsyncIterable<T>, fn: ScanrFn<T, T>): AsyncIterable<T> {
    logger.trace('_scanr1_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    const [init, last] = await initLast(prepend(value, iter));

    yield* _scanr(fn, last!, init);
}

export function _scanr1<T>(fn: ScanrFn<T, T>, iter: AsyncIterable<T>) {
    logger.trace('_scanr1()');
    return _scanr1_impl_fn(iter, fn);
}
