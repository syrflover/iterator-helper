import { getLogger } from '../logger.ts';

import { next_async } from '../lib/iterable/next.ts';

const logger = getLogger('iterator/head');

async function _head_impl_fn<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    logger.trace('_head_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    return value;
}

export function _head<T>(iter: AsyncIterable<T>) {
    logger.trace('_head()');
    return _head_impl_fn(iter);
}
