import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';

const logger = getLogger('iterator/all');

async function _all_impl_fn<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>): Promise<boolean> {
    for await (const elem of iter) {
        const condition = await fn(elem);

        logger.debug('element   =', elem);
        logger.debug('condition =', condition);

        if (!condition) {
            return false;
        }
    }

    return true;
}

export interface All {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<boolean>;
}

export const _all: All = _curry(<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>) => {
    logger.trace('_all()');
    return _all_impl_fn(iter, fn);
});
