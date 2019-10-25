import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

import { next } from './lib/next';

const logger = getLogger('iterator/all');

async function _all_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<boolean> {
    logger.trace('_all_impl_fn()');
    const { done, value } = await next(iter);

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return true;
    }

    const condition = await fn(value);

    logger.debug('condition =', condition);

    if (!condition) {
        return false;
    }

    return _all_impl_fn(iter, fn);
}

export function _all<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_all()');
    return _all_impl_fn(iter, fn);
}
