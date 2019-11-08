

import { FoldrFn } from '../types/fn/fold.ts';

import { _curry, Curry2 } from '../lib/curry.ts';
import { _reverse } from './reverse.ts';



/* async function _foldr_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldrFn<A, B>): Promise<B> {
    
    const acc = await accumulator;
    const { done, value } = await next_async(iter);

    
    
    

    if (done) {
        return acc;
    }

    return fn(value, await _foldr_impl_fn(iter, acc, fn));
} */

async function _foldr_impl_fn<A, B>(iter: AsyncIterable<A>, init: B | Promise<B>, fn: FoldrFn<A, B>): Promise<B> {
    
    let acc = await init;

    for await (const elem of _reverse(iter)) {
        acc = await fn(elem, acc);

        
        
    }

    return acc;
}

export interface Foldr {
    <A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): Promise<B>;
    <A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => Promise<B>;
    <A, B>(fn: FoldrFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, Promise<B>>;
}

export const _foldr: Foldr = _curry(<A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    
    return _foldr_impl_fn(iter, init, fn);
});
