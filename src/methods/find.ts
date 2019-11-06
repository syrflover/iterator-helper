import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/find');

async function _find_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): Promise<T | undefined> {
    logger.info('_find_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return;
    }

    const condition = await predicate(value);

    logger.debug('condition =', condition);

    if (condition) {
        return value;
    }

    return _find_impl_fn(iter, predicate);
}

export interface Find {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _find: Find = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.info('_find()');
    return _find_impl_fn(iter, predicate);
});
