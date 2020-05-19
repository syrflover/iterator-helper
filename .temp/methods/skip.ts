

import { next_async } from '../lib/iterable/mod';

import { _curry } from '../lib/utils/mod';



async function* _skip_impl_fn<T>(count: number, iter: AsyncIterable<T>): AsyncIterable<T> {
    
    let current = 1;

    while (true) {
        const { done } = await next_async(iter);

        
        
        

        if (done) {
            return;
        }

        if (current >= count) {
            yield* iter;
            return;
        }

        current += 1;
    }
}

export interface Skip {
    <T>(count: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(count: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const skip: Skip = _curry(_skip_impl_fn);
