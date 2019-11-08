

import { MapFn } from '../types/fn/map.ts';

import { Nullable } from '../types/nullable.ts';

import { isNull } from '../types/guard/isNull.ts';

import { _curry } from '../lib/curry.ts';



async function _find_map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, Nullable<R>>): Promise<R | undefined> {
    for await (const elem of iter) {
        const mapped = await fn(elem);

        
        

        if (!isNull(mapped)) {
            return mapped;
        }
    }
}

export interface FindMap {
    <T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): Promise<R | undefined>;
    <T, R>(fn: MapFn<T, Nullable<R>>): (iter: AsyncIterable<T>) => Promise<R | undefined>;
}

export const _findMap: FindMap = _curry(<T, R>(predicate: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>) => {
    
    return _find_map_impl_fn(iter, predicate);
});
