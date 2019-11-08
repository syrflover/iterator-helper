

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';



async function* _skip_impl_fn<T>(iter: AsyncIterable<T>, count: number): AsyncIterable<T> {
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

export const _skip: Skip = _curry(<T>(count: number, iter: AsyncIterable<T>) => {
    
    return _skip_impl_fn(iter, count);
});
