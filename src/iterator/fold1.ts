import { logger } from '../logger';

import { FoldFn } from '../types/fn/fold';

import { _fold } from './fold';

export async function _fold1<T>(iter: AsyncIterable<T>, fn: FoldFn<T>) {
    logger.trace('iterator/fold1', '_fold1()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value: head } = await it.next();

    if (done) {
        throw new Error('Least One Element is Required in Iterator');
    }

    return _fold<T>(iter, head, fn);
}