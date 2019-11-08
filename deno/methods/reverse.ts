

import { _foldl } from './foldl.ts';

import { sequence } from '../lib/iterable.ts';

import { prepend } from '../lib/iterable/prepend.ts';

import { flip } from '../lib/flip.ts';



async function* _reverse_impl_fn<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    
    const emptyIter = sequence<T>([]);
    yield* await _foldl((acc, e) => flip(prepend, acc, e), emptyIter, iter);
}

export function _reverse<T>(iter: AsyncIterable<T>) {
    
    return _reverse_impl_fn(iter);
}
