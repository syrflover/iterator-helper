import { getLogger } from '../logger';

import { AsyncIterator_ } from '../iterator';

import { next } from './lib/next';

const logger = getLogger('iterator/take');

async function* _take_impl_fn<T>(iter: AsyncIterable<T>, limit: number, current: number = 1): AsyncIterable<T> {
    logger.trace('_take_impl_fn()');
    const { done, value } = await next(iter);

    logger.debug('done    =', done);
    logger.debug('value   =', value);
    logger.debug('limit   =', limit);
    logger.debug('current =', current);

    if (done || current > limit) {
        return;
    }

    yield value;
    yield* _take_impl_fn(iter, limit, current + 1);
}

export function _take<T>(limit: number, iter: AsyncIterable<T>) {
    logger.trace('_take()');
    return new AsyncIterator_(_take_impl_fn(iter, limit));
}
