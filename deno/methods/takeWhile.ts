

import { PredicateFn } from '../types/fn/predicate.ts';

import { _curry } from '../lib/curry.ts';



async function* _take_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
    for await (const elem of iter) {
        const condition = await predicate(elem);

        
        

        if (!condition) {
            return;
        }

        yield elem;
    }
}

export interface TakeWhile {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _takeWhile: TakeWhile = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    
    return _take_while_impl_fn(iter, predicate);
});
