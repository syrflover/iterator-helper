import { getLogger } from '../logger';

import { ForEachFn } from '../types/fn/forEach';

import { next_async } from '../lib/iterable/next';

import { curry } from '../lib/curry';

const logger = getLogger('iterator/forEach');

async function _for_each_impl_fn<T>(iter: AsyncIterable<T>, fn: ForEachFn<T>): Promise<void> {
    logger.trace('_for_each_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', value);

    if (done) {
        return;
    }

    await fn(value);

    return _for_each_impl_fn(iter, fn);
}

export interface ForEach {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => Promise<void>;
}

export const _forEach: ForEach = curry(<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_forEach()');
    return _for_each_impl_fn(iter, fn);
});