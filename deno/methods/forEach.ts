

import { ForEachFn } from '../types/fn/forEach.ts';

import { _curry } from '../lib/curry.ts';



async function _for_each_impl_fn<T>(iter: AsyncIterable<T>, fn: ForEachFn<T>): Promise<void> {
    for await (const elem of iter) {
        await fn(elem);
        
    }
}

export interface ForEach {
    <T>(fn: ForEachFn<T>, iter: AsyncIterable<T>): Promise<void>;
    <T>(fn: ForEachFn<T>): (iter: AsyncIterable<T>) => Promise<void>;
}

export const _forEach: ForEach = _curry(<T>(fn: ForEachFn<T>, iter: AsyncIterable<T>) => {
    
    return _for_each_impl_fn(iter, fn);
});
