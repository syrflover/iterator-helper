import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { toAsyncIterable } from '../lib/iterable';

import { next_async } from './lib/next';

const logger = getLogger('iterator/cycle');

async function* _cycle_impl_fn<T>(iter: AsyncIterable<T>, r: T[] = []): AsyncIterable<T> {
    logger.trace('_cycle_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (!done) {
        yield value;
        yield* _cycle_impl_fn(iter, [...r, value]);
        return;
    }

    yield* _cycle_impl_fn(toAsyncIterable(r));
}

export function _cycle<T>(iter: AsyncIterable<T>) {
    logger.trace('_cycle()');
    return (new AsyncIterator_(_cycle_impl_fn(iter)) as unknown) as ToAsyncIterator<T>;
}
