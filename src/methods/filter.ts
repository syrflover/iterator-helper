import type { PredicateFn } from '../types/functions/mod.ts';

import { getLogger } from '../logger.ts';

import { _curry } from '../lib/utils/mod.ts';

const logger = await getLogger('methods/filter');

async function* _filter_impl_fn<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) {
    logger.trace('filter()');
    for await (const elem of iter) {
        if (await predicate(elem)) {
            yield elem;
        }
    }
}

export interface Filter {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const filter: Filter = _curry(_filter_impl_fn);
