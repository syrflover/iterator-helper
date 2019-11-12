

import { Pair, pair } from '../types/mod.ts';

import { append, sequence } from '../lib/iterable/mod.ts';

import { fold } from './fold.ts';



async function _unzip_impl_fn<T, U>(
    iter: AsyncIterable<Pair<T, U>>,
): Promise<Pair<AsyncIterable<T>, AsyncIterable<U>>> {
    
    return fold((acc, elem) => {
        const [left_iter, right_iter] = acc;
        const [left_value, right_value] = elem;

        return pair(append(left_value, left_iter), append(right_value, right_iter));
    }, pair(sequence<T>([]), sequence<U>([])), iter);
}

export function unzip<T, U>(iter: AsyncIterable<Pair<T, U>>): Promise<Pair<AsyncIterable<T>, AsyncIterable<U>>> {
    return _unzip_impl_fn(iter);
}
