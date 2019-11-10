

import { PredicateFn } from '../types/fn/mod.ts';

import { next_async, prepend } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';



async function* _skip_while_impl_fn<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    
    while (true) {
        const { done, value } = await next_async(iter);

        
        

        if (done) {
            return;
        }

        const condition = await predicate(value);

        

        if (!condition) {
            yield* prepend(value, iter);
            return;
        }
    }
}

export interface SkipWhile {
    <T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(predicate: PredicateFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const skipWhile: SkipWhile = _curry(_skip_while_impl_fn);
