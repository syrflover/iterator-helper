import { getLogger } from '../logger.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/skip');

async function* _skip_impl_fn<T>(iter: AsyncIterable<T>, count: number, current: number = 1): AsyncIterable<T> {
    logger.info('_skip_impl_fn()');
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

export interface Skip {
    <T>(count: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(count: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _skip: Skip = _curry(<T>(count: number, iter: AsyncIterable<T>) => {
    logger.info('_skip()');
    return _skip_impl_fn(iter, count);
});
