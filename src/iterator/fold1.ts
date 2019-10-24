import { getLogger } from '../logger';

import { FoldFn } from '../types/fn/fold';

import { _fold } from './fold';

const logger = getLogger('iterator/fold1');

export async function _fold1<T>(iter: AsyncIterable<T>, fn: FoldFn<T>) {
    logger.trace('_fold1()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value: head } = await it.next();

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return _fold<T>(iter, head, fn);
}
