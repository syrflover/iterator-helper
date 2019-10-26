import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

import { next_async } from './lib/next';

const logger = getLogger('iterator/any');

async function _any_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<boolean> {
    logger.trace('_any_impl_fn()');
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

export function _any<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_any()');
    return _any_impl_fn(iter, fn);
}
