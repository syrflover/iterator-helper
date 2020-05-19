

import { CompareFn } from '../types/functions/mod';

import { _curry, id } from '../lib/utils/mod';

import { minByKey } from './minByKey';



export interface MinBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const minBy: MinBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    
    return minByKey(id, fn, iter);
});
