

import { Flatten } from '../types/flatten.ts';

import { isIterable } from '../types/guard/isIterable.ts';
import { isAsyncIterable } from '../types/guard/isAsyncIterable.ts';



async function* _flatten_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Flatten<T>> {
    for await (const elem of iter) {
        

        if (isIterable(elem) || isAsyncIterable(elem)) {
            yield* elem;
        } else {
            yield elem as Flatten<T>;
        }
    }
}

export function _flatten<T>(iter: AsyncIterable<T>) {
    
    return _flatten_impl_fn(iter);
}
