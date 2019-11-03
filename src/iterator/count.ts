import { getLogger } from '../logger';

// import { next_async } from '../lib/iterable/next';

import { _foldl } from './foldl';

const logger = getLogger('iterator/count');

/* async function _count_impl_fn<T>(iter: AsyncIterable<T>, current: number = 0): Promise<number> {
    logger.trace('_count_impl_fn()');
    const { done } = await next_async(iter);

    logger.debug('done    =', done);
    logger.debug('current =', current);

    if (done) {
        return current;
    }

    return _count_impl_fn(iter, current + 1);
} */

export function _count<T>(iter: AsyncIterable<T>) {
    logger.trace('_count()');
    return _foldl((acc) => acc + 1, 0, iter);
    // return _count_impl_fn(iter);
}
