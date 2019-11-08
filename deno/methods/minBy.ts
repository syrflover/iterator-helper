

import { CompareFn } from '../types/fn/cmp.ts';

import { next_async } from '../lib/iterable/next.ts';

import { minBy } from '../lib/cmp.ts';
import { _curry } from '../lib/curry.ts';

import { _foldl } from './foldl.ts';
import { id } from '../lib/id.ts';



async function _min_by_impl_fn<T>(iter: AsyncIterable<T>, fn: CompareFn<T>): Promise<T | undefined> {
    const { done, value } = await next_async(iter);

    if (done) {
        return;
    }

    return _foldl((acc, e) => minBy(id, fn, acc, e), value, iter);
}

export interface MinBy {
    <T>(fn: CompareFn<T>, iter: AsyncIterable<T>): Promise<T | undefined>;
    <T>(fn: CompareFn<T>): (iter: AsyncIterable<T>) => Promise<T | undefined>;
}

export const _minBy: MinBy = _curry(<T>(fn: CompareFn<T>, iter: AsyncIterable<T>) => {
    
    return _min_by_impl_fn(iter, fn);
});
