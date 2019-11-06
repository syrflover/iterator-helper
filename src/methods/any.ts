import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/any');

async function _any_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<boolean> {
    logger.info('_any_impl_fn()');
    const { done, value } = await next_async(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return false;
    }

    const condition = await fn(value);

    logger.debug('condition =', condition);

    if (condition) {
        return true;
    }

    return _any_impl_fn(iter, fn);
}

/* export function _any<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.info('_any()');
    return _any_impl_fn(iter, fn);
} */

export interface Any {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<boolean>;
}

export const _any: Any = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.info('_any()');
    return _any_impl_fn(iter, fn);
});
