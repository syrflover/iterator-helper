import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/find');

export async function _find<T>(predicate: PredicateFn<T>, iter: AsyncIterable<T>): Promise<T | undefined> {
    logger.trace('_find()');
    const it = iter[Symbol.asyncIterator]();
    const { done, value } = await it.next();

    if (done) {
        return;
    }

    if (await predicate(value)) {
        return value;
    }

    return _find(predicate, iter);
}
