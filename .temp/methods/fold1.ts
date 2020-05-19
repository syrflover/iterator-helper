

import { FoldFn } from '../types/functions/mod';

import { next_async } from '../lib/iterable/mod';
import { _curry } from '../lib/utils/mod';

import { fold } from './fold';



async function _fold1_impl_fn<T>(fn: FoldFn<T, T>, iter: AsyncIterable<T>) {
    
    const { done, value: head } = await next_async(iter);

    
    

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return fold(fn, head, iter);
}

export interface Fold1 {
    <T>(fn: FoldFn<T, T>, iter: AsyncIterable<T>): Promise<T>;
    <T>(fn: FoldFn<T, T>): (iter: AsyncIterable<T>) => Promise<T>;
}

export const fold1: Fold1 = _curry(_fold1_impl_fn);
