import { getLogger } from '../logger.ts';

import { toAsyncIterable } from '../lib/iterable.ts';

import { next_async } from '../lib/iterable/next.ts';
import { append } from '../lib/iterable/append.ts';

const logger = getLogger('iterator/cycle');

async function* _cycle_impl_fn<T>(iter: AsyncIterable<T>, r: AsyncIterable<T> = toAsyncIterable([])): AsyncIterable<T> {
    logger.trace('_cycle_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (!done) {
        yield value;
        yield* _cycle_impl_fn(iter, append(value, r));
        return;
    }

    yield* _cycle_impl_fn(r);
}

export function _cycle<T>(iter: AsyncIterable<T>) {
    logger.trace('_cycle()');
    return _cycle_impl_fn(iter);
}
