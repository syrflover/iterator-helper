import { getLogger } from '../logger.ts';

import { FoldlFn } from '../types/fn/mod.ts';

import { next_async } from '../lib/iterable/mod.ts';
import { _curry } from '../lib/utils/mod.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/foldl1');

async function _foldl1_impl_fn<T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>) {
    logger.trace('foldl1()');
    const { done, value: head } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', head);

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return foldl(fn, head, iter);
}

export interface Foldl1 {
    <T>(fn: FoldlFn<T, T>, iter: AsyncIterable<T>): Promise<T>;
    <T>(fn: FoldlFn<T, T>): (iter: AsyncIterable<T>) => Promise<T>;
}

export const foldl1: Foldl1 = _curry(_foldl1_impl_fn);
