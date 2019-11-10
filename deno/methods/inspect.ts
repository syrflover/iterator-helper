

import { ForEachFn } from '../types/fn/mod.ts';

import { _curry } from '../lib/utils/mod.ts';



async function* _inspect_impl_fn<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): AsyncIterable<T> {
    
    for await (const elem of iter) {
        await fn(elem);

        

        yield elem;
    }
}

export interface Inspect {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): AsyncIterable<T>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => AsyncIterable<T>;
}

export const inspect: Inspect = _curry(_inspect_impl_fn);
