

import { MapFn } from '../types/functions/mod';
import { Nullable } from '../types/mod';
import { isNull } from '../types/guards/mod';

import { _curry } from '../lib/utils/mod';



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
