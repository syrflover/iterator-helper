import { getLogger } from '../logger';

// import { next_async } from '../lib/iterable/next';

import { _foldl } from './foldl';

const logger = getLogger('iterator/collect');

/* async function _collect_impl_fn<T>(iter: AsyncIterable<T>, r: T[] = []): Promise<T[]> {
    logger.trace('_collect_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return r;
    }

    return _collect_impl_fn(iter, [...r, value]);
} */

export function _collect<T>(iter: AsyncIterable<T>) {
    logger.trace('_collect()');
    return _foldl((acc, e) => [...acc, e], [] as T[], iter);
    // return _collect_impl_fn(iter);
}