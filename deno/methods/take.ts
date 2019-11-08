

import { _curry } from '../lib/curry.ts';



async function* _take_impl_fn<T>(iter: AsyncIterable<T>, limit: number): AsyncIterable<T> {
    let current = 1;

    for await (const elem of iter) {
        if (current > limit) {
            return;
        }

        

        yield elem;

        current += 1;
    }
}

export interface Take {
    <T>(limit: number, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(limit: number): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _take: Take = _curry(<T>(limit: number, iter: AsyncIterable<T>) => {
    
    return _take_impl_fn(iter, limit);
});
