

import { Nullable } from '../types/mod';
import { MapFn } from '../types/functions/mod';
import { isNull } from '../types/guards/mod';

import { _curry } from '../lib/utils/mod';



async function* _filter_map_impl_fn<T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): AsyncIterable<R> {
    
    for await (const elem of iter) {
        const mapped = await fn(elem);

        
        

        if (!isNull(mapped)) {
            yield mapped;
        }
    }
}

export interface FilterMap {
    <T, R>(fn: MapFn<T, Nullable<R>>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, Nullable<R>>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const filterMap: FilterMap = _curry(_filter_map_impl_fn);
