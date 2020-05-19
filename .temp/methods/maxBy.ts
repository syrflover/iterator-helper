

import { CompareFn } from '../types/functions/mod';

import { _curry, id } from '../lib/utils/mod';

import { maxByKey } from './maxByKey';



export interface MaxBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const maxBy: MaxBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    
    return maxByKey(id, fn, iter);
});
