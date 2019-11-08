import { getLogger } from '../logger.ts';

import { pair, Pair } from '../types/pair.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _scanl } from './scanl.ts';

const logger = getLogger('iterator/enumerate');

async function* _enumerate_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Pair<number, T>> {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    yield* _scanl(([current], elem) => pair(current + 1, elem), pair(0, value), iter);
}

export function _enumerate<T>(iter: AsyncIterable<T>) {
    logger.trace('_enumerate()');
    return _enumerate_impl_fn(iter);
}
