

import { PredicateFn } from '../types/fn/mod.ts';

import { _curry } from '../lib/utils/mod.ts';



async function _all_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<boolean> {
    
    for await (const elem of iter) {
        const condition = await fn(elem);

        
        

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
