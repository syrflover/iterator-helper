

import { _curry } from '../lib/utils/mod.ts';



async function* _take_impl_fn<T>(limit: number, iter: AsyncIterable<T>): AsyncIterable<T> {
    
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

export const take: Take = _curry(_take_impl_fn);
