import { getLogger } from '../logger';

import { FoldrFn } from '../types/fn/fold';

import { next_async } from '../lib/iterable/next';

import { _foldr } from './foldr';

const logger = getLogger('iterator/foldr1');

async function _foldr1_impl_fn<T>(iter: AsyncIterable<T>, fn: FoldrFn<T, T>) {
    logger.trace('_foldr1_impl_fn()');
    const { done, value: head } = await next_async(iter);

    logger.debug('done  =', done);
    logger.debug('value =', head);

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return _foldr(fn, head, iter);
}

export async function _foldr1<T>(fn: FoldrFn<T, T>, iter: AsyncIterable<T>) {
    logger.trace('_foldr1()');
    return _foldr1_impl_fn(iter, fn);
}
