

import { PredicateFn } from '../types/fn/predicate.ts';

import { prepend } from '../lib/iterable/prepend.ts';
import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';



async function* _skip_while_impl_fn<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>): AsyncIterable<T> {
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

export const _skipWhile: SkipWhile = _curry(<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>) => {
    
    return _skip_while_impl_fn(iter, predicate);
});
