

import { FoldlFn } from '../types/fn/fold.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';

import { _foldl } from './foldl.ts';



async function _foldl1_impl_fn<T>(iter: AsyncIterable<T>, fn: FoldlFn<T, T>) {
    
    const { done, value: head } = await next_async(iter);

    
    

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return _foldl(fn, head, iter);
}

export interface Foldl1 {
    <T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>): Promise<T>;
    <T>(fn: FoldlFn<T, T>): (iter: AsyncIterable<T>) => Promise<T>;
}

export const _foldl1: Foldl1 = _curry(<T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>) => {
    
    return _foldl1_impl_fn(iter, fn);
});
