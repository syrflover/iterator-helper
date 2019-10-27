import { getLogger } from '../logger';

import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/last');

async function _last_impl_fn<T>(iter: AsyncIterable<T>, last?: T): Promise<T | undefined> {
    logger.trace('_last_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return last;
    }

    return _last_impl_fn(iter, value);
}

export function _last<T>(iter: AsyncIterable<T>) {
    logger.trace('_last()');
    return _last_impl_fn(iter);
}
