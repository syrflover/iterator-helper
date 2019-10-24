import { getLogger } from '../logger';

import { FoldFn } from '../types/fn/fold';

import { _foldl } from './foldl';

const logger = getLogger('iterator/fold1');

export async function _foldl1<A, B>(iter: AsyncIterable<A>, fn: FoldFn<A, B>) {
    logger.trace('_fold1()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value: head } = await it.next();

    if (done) {
        throw new Error('Least one element is required in Iterator');
    }

    return _foldl<A, B>(iter, head, fn);
}
