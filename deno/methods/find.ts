import { PredicateFn } from '../types/functions/mod.ts';

import { _curry } from '../lib/utils/mod.ts';

async function _find_impl_fn<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Promise<T | undefined> {
    for await (const elem of iter) {
        const condition = await predicate(elem);

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
