import { getLogger } from '../logger.ts';

import { PredicateFn } from '../types/function/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = getLogger('methods/any');

async function _any_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean> {
    logger.trace('any()');
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

export const any: Any = _curry(_any_impl_fn);
