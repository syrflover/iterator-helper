import { getLogger } from '../logger.ts';

import { next_async } from '../lib/iterable/mod.ts';

const logger = getLogger('methods/head');

async function _head_impl_fn<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    logger.trace('head()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    return value;
}

export function head<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    return _head_impl_fn(iter);
}
