import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/all');

async function _all_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean> {
    logger.trace('_all_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    logger.debug('done      =', done);
    logger.debug('value     =', value);

    if (done) {
        return true;
    }

    const condition = await fn(value);

    logger.debug('fn(value) =', condition);

    if (!condition) {
        return false;
    }

    return _all_impl_fn(fn, iter);
}

export function _all<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_all()');
    return _all_impl_fn(fn, iter);
}
