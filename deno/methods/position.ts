

import { PredicateFn } from '../types/function/mod.ts';

import { _curry } from '../lib/utils/mod.ts';



async function _position_impl_fn<T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<number | undefined> {
    
    let pos = 0;

    for await (const elem of iter) {
        const condition = await fn(elem);

        if (condition) {
            return pos;
        }

        pos += 1;
    }
}

export interface Position {
    <T>(fn: PredicateFn<T>, iter: AsyncIterable<T>): Promise<number | undefined>;
    <T>(fn: PredicateFn<T>): (iter: AsyncIterable<T>) => Promise<number | undefined>;
}

export const position: Position = _curry(_position_impl_fn);
