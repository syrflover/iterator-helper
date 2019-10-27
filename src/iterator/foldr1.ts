import { getLogger } from '../logger';

import { FoldrFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';
import { initLast } from '../lib/iterable/initLast';

import { _foldr } from './foldr';
import { append } from '../lib/iterable/append';

const logger = getLogger('iterator/foldr1');

async function _foldr1_impl_fn<T>(iter: AsyncIterable<T>, fn: FoldrFn<T, T>) {
    logger.trace('_foldr1_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    const [init, last] = await initLast(append(value, iter));

    return _foldr(fn, last!, init);
}

export function _foldr1<T>(fn: FoldrFn<T, T>, iter: AsyncIterable<T>) {
    logger.trace('_foldr1()');
    return _foldr1_impl_fn(iter, fn);
}
