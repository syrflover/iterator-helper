import { getLogger } from '../logger';

import { AsyncIterator_, ToAsyncIterator } from '../iterator';

import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/drop');

async function* _skip_impl_fn<T>(iter: AsyncIterable<T>, count: number, current: number = 1): AsyncIterable<T> {
    logger.trace('_drop()');
    const { done } = await next_async(iter);

    logger.debug('done    =', done);
    logger.debug('count   =', count);
    logger.debug('current =', current);

    if (done) {
        return;
    }

    if (current >= count) {
        yield* iter;
        return;
    }

    yield* _skip_impl_fn(iter, count, current + 1);
}

export function _skip<T>(count: number, iter: AsyncIterable<T>) {
    logger.trace('_drop()');
    return _skip_impl_fn(iter, count);
}
