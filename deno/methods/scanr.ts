

import { ScanrFn } from '../types/fn/scan.ts';

import { sequence } from '../lib/iterable.ts';

import { _curry, Curry2 } from '../lib/curry.ts';

import { _reverse } from './reverse.ts';



/* async function* _scanr_impl_fn<A, B>(iter: AsyncIterable<A>, state: B | Promise<B>, fn: ScanrFn<A, B>): AsyncIterable<B> {
    
    const st = await state;
    const { done, value } = await next_async(iter);

    
    
    

    if (done) {
        yield st;
        return;
    }

    const qs = _scanr_impl_fn(iter, st, fn);
    const { value: q } = await next_async(qs);

    yield* prepend(await fn(value, q), prepend(q, qs));
} */

async function* _scanr_impl_fn<A, B>(iter: AsyncIterable<A>, init: B | Promise<B>, fn: ScanrFn<A, B>): AsyncIterable<B> {
    let state = await init;

    const states: B[] = [state];

    for await (const elem of _reverse(iter)) {
        state = await fn(elem, state);
        states.push(state);
    }

    yield* _reverse(sequence(states));
}

export interface Scanr {
    <A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>): AsyncIterable<B>;
    <A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>): (iter: AsyncIterable<A>) => AsyncIterable<B>;
    <A, B>(fn: ScanrFn<A, B>): Curry2<B | Promise<B>, AsyncIterable<A>, AsyncIterable<B>>;
}

export const _scanr: Scanr = _curry(<A, B>(fn: ScanrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) => {
    
    return _scanr_impl_fn(iter, init, fn);
});
