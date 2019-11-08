

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';



async function* _filter_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>) {
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

export const _filter: Filter = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    
    return _filter_impl_fn(iter, predicate);
});
