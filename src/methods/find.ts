import type { PredicateFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/find');

async function _find_impl_fn<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Promise<T | undefined> {
    logger.trace('find()');
    for await (const elem of iter) {
        const condition = await predicate(elem);

        logger.debug('element   =', elem);
        logger.debug('condition =', condition);

        if (condition) {
            return elem;
        }
    }
}

export interface Find {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const find: Find = _curry(_find_impl_fn);
