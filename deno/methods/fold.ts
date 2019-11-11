

import { FoldFn } from '../types/functions/mod.ts';

import { _curry, Curry2 } from '../lib/utils/mod.ts';



async function _fold_impl_fn<A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B> {
    
    let acc = await init;

    

    for await (const elem of iter) {
        acc = await fn(acc, elem);
        
        
    }

    return acc;
}

export interface Fold {
    <A, B>(fn: FoldFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

// (b -> a -> b) -> b -> t a -> b
export const fold: Fold = _curry(_fold_impl_fn);
