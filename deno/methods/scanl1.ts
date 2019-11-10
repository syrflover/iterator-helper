

import { ScanlFn } from '../types/fn/mod.ts';

import { next_async } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

import { scanl } from './scanl.ts';



async function* _scanl1_impl_fn<T>(fn: ScanlFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    
    const { done, value: head } = await next_async(iter);

    if (done) {
        return;
    }

    yield* scanl(fn, head, iter);
}

export interface Scanl1 {
    <T>(fn: ScanlFn<T, T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ScanlFn<T, T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const scanl1: Scanl1 = _curry(_scanl1_impl_fn);
