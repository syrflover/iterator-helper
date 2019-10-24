import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/all');

export async function _all<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>) {
    logger.trace('_all()');
    for await (const elem of iter) {
        const condition = await fn(elem);
        logger.debug('elem     =', elem);
        logger.debug('fn(elem) =', condition);

        if (!condition) {
            return false;
        }
    }
    return true;
}
