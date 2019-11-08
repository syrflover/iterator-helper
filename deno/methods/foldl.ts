

import { FoldlFn } from '../types/fn/fold.ts';

import { _curry, Curry2 } from '../lib/curry.ts';



async function _foldl_impl_fn<A, B>(iter: AsyncIterable<A>, init: B | Promise<B>, fn: FoldlFn<A, B>): Promise<B> {
    let acc = await init;

    

    for await (const elem of iter) {
        acc = await fn(acc, elem);
        
        
    }

    return acc;
}

export interface Foldl {
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldlFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

// (b -> a -> b) -> b -> t a -> b
export const _foldl: Foldl = _curry(<A, B>(fn: FoldlFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    
    return _foldl_impl_fn(iter, init, fn);
});
