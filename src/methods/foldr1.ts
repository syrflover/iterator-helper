import { getLogger } from '../logger.ts';

import { FoldrFn } from '../types/fn/fold.ts';

import { next_async } from '../lib/iterable/next.ts';
import { initLast } from '../lib/iterable/initLast.ts';
import { append } from '../lib/iterable/append.ts';

import { _curry } from '../lib/curry.ts';

import { _foldr } from './foldr.ts';

const logger = getLogger('iterator/foldr1');

async function _foldr1_impl_fn<T>(iter: AsyncIterable<T>, fn: FoldrFn<T, T>) {
    logger.info('_foldr1_impl_fn()');
    const { done, value } = await next_async(iter);

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    const [init, last] = await initLast(append(value, iter));

    return _foldr(fn, last!, init);
}

export interface Foldr1 {
    <T>(fn: FoldrFn<T, T>, iter: AsyncIterable<T>): Promise<T>;
    <T>(fn: FoldrFn<T, T>): (iter: AsyncIterable<T>) => Promise<T>;
}

export const _foldr1: Foldr1 = _curry(<T>(fn: FoldrFn<T, T>, iter: AsyncIterable<T>) => {
    logger.info('_foldr1()');
    return _foldr1_impl_fn(iter, fn);
});
