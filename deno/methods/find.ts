

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';



async function _find_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): Promise<T | undefined> {
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

export const _find: Find = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    
    return _find_impl_fn(iter, predicate);
});
