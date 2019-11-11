

import { CompareFn } from '../types/functions/mod.ts';

import { _curry, id } from '../lib/utils/mod.ts';

import { minByKey } from './minByKey.ts';



export interface MinBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const minBy: MinBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    
    return minByKey(id, fn, iter);
});
