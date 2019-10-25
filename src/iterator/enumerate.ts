import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { pair, Pair } from '../types/pair';

import { next } from './lib/next';

const logger = getLogger('iterator/enumerate');

async function* _enumerate_impl_fn<T>(iter: AsyncIterable<T>, current: number = 0): AsyncIterable<Pair<number, T>> {
    logger.trace('_enumerate_impl_fn()');
    const { done, value } = await next(iter);

    if (done) {
        return;
    }

    yield [current, value];

    yield* _enumerate_impl_fn(iter, current + 1);
}

export function _enumerate<T>(iter: AsyncIterable<T>) {
    logger.trace('_enumerate()');
    return (new AsyncIterator_(_enumerate_impl_fn(iter)) as unknown) as ToAsyncIterator<Pair<number, T>>;
}
