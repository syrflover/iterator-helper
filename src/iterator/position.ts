import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/position');

async function _position_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>, current: number = 0): Promise<number | undefined> {
    logger.trace('_position_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    const condition = await fn(value);

    if (condition) {
        return current;
    }

    return _position_impl_fn(iter, fn, current + 1);
}

export function _position<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_position()');
    return _position_impl_fn(iter, fn);
}
