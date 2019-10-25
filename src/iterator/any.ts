import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/any');

async function _any_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean> {
    logger.trace('_any_impl_fn()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    if (done) {
        return false;
    }

    const condition = await fn(value);

    if (condition) {
        return true;
    }

    return _any_impl_fn(fn, iter);
}

export function _any<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_any()');
    return _any_impl_fn(fn, iter);
}
