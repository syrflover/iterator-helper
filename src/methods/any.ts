import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/any');

async function _any_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<boolean> {
    for await (const elem of iter) {
        const condition = await fn(elem);

        logger.debug('elemen    =', elem);
        logger.debug('condition =', condition);

        if (condition) {
            return true;
        }
    }

    return false;
}

/* export function _any<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('_any()');
    return _any_impl_fn(iter, fn);
} */

export interface Any {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<boolean>;
}

export const _any: Any = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_any()');
    return _any_impl_fn(iter, fn);
});
