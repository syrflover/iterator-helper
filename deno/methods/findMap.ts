

import { MapFn } from '../types/fn/mod.ts';
import { Nullable } from '../types/mod.ts';
import { isNull } from '../types/guard/mod.ts';

import { _curry } from '../lib/utils/mod.ts';



async function _find_map_impl_fn<T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): Promise<R | undefined> {
    
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

export const findMap: FindMap = _curry(_find_map_impl_fn);
