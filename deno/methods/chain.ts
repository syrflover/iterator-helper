

import { _curry } from '../lib/curry.ts';



async function* _chain_impl_fn<T>(iter: AsyncIterable<T>, other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): AsyncIterable<T> {
    yield* iter;
    yield* other;
}

export interface Chain {
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const _chain: Chain = _curry(<T>(other: Iterable<T | Promise<T>> | AsyncIterable<T | Promise<T>>, iter: AsyncIterable<T>) => {
    
    return _chain_impl_fn(iter, other);
});
