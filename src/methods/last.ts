import { getLogger } from '../logger.ts';

// import { next_async } from '../lib/iterable/next.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/last');

/* async function _last_impl_fn<T>(iter: AsyncIterable<T>, last?: T): Promise<T | undefined> {
    logger.trace('_last_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return last;
    }

    return _last_impl_fn(iter, value);
} */

// [a] -> Maybe a
export function _last<T>(iter: AsyncIterable<T>) {
    logger.trace('_last()');
    return _foldl((_, e) => e, undefined as T | undefined, iter);
    // return _last_impl_fn(iter);
}
