

import { ForEachFn } from '../types/functions/mod';

import { _curry } from '../lib/utils/mod';



async function _for_each_impl_fn<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void> {
    
    for await (const elem of iter) {
        await fn(elem);
        
    }
}

export interface ForEach {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => Promise<void>;
}

export const forEach: ForEach = _curry(_for_each_impl_fn);
