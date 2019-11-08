import { getLogger } from '../logger.ts';

import { Pair, pair } from '../types/pair.ts';

import { sequence } from '../lib/iterable.ts';
import { append } from '../lib/iterable/append.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/unzip');

async function _unzip_impl_fn<T, U>(
    iter: AsyncIterable<Pair<T, U>>,
): Promise<Pair<AsyncIterable<T>, AsyncIterable<U>>> {
    return _foldl((acc, elem) => {
        const [left_iter, right_iter] = acc;
        const [left_value, right_value] = elem;

        return pair(append(left_value, left_iter), append(right_value, right_iter));
    }, pair(sequence<T>([]), sequence<U>([])), iter);
}

export function _unzip<T, U>(iter: AsyncIterable<Pair<T, U>>) {
    logger.trace('_unzip()');
    return _unzip_impl_fn(iter);
}
