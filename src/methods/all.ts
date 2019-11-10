import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/fn/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = getLogger('methods/all');

async function _all_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean> {
    logger.trace('all()');
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

export const all: All = _curry(_all_impl_fn);
