import { getLogger } from '../logger';

import { FoldrFn } from '../types/fn/fold';

import { _reverse } from './reverse';
import { next_async } from '../lib/iterable/next';

const logger = getLogger('iterator/foldr');

async function _foldr_impl_fn<A, B>(iter: AsyncIterable<A>, accumulator: B | Promise<B>, fn: FoldrFn<A, B>): Promise<B> {
    logger.trace('_foldr_impl_fn()');
    const acc = await accumulator;
    const { done, value } = await next_async(iter);

    logger.debug('done        =', done);
    logger.debug('value       =', value);
    logger.debug('accumulator =', acc);

    if (done) {
        return acc;
    }

    return fn(value, await _foldr_impl_fn(iter, acc, fn));
}

export function _foldr<A, B>(fn: FoldrFn<A, B>, init: B | Promise<B>, iter: AsyncIterable<A>) {
    logger.trace('_foldr()');
    return _foldr_impl_fn(iter, init, fn);
}
