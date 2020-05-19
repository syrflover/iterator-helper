

import { pair, Pair } from '../types/mod';

import { next_async } from '../lib/iterable/mod';

import { scan } from './scan';



async function* _enumerate_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<Pair<number, T>> {
    
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    yield* scan(([current], elem) => pair(current + 1, elem), pair(0, value), iter);
}

export function enumerate<T>(iter: AsyncIterable<T>): AsyncIterable<Pair<number, T>> {
    return _enumerate_impl_fn(iter);
}
