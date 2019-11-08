

import { MapFn } from '../types/fn/map.ts';

import { next_async } from '../lib/iterable/next.ts';

import { _curry } from '../lib/curry.ts';



async function* _map_impl_fn<T, R>(iter: AsyncIterable<T>, fn: MapFn<T, R>): AsyncIterable<R> {
    for await (const elem of iter) {
        const mapped = await fn(elem);

        
        

        yield mapped;
    }
}

export interface Map {
    <T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>): AsyncIterable<R>;
    <T, R>(fn: MapFn<T, R>): (iter: AsyncIterable<T>) => AsyncIterable<R>;
}

export const _map: Map = _curry(<T, R>(fn: MapFn<T, R>, iter: AsyncIterable<T>) => {
    
    return _map_impl_fn(iter, fn);
});
