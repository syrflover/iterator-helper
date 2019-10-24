import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/any');

export async function _any<T>(iter: AsyncIterable<T>, fn: PredicateFn<T>) {
    logger.trace('_any()');
    for await (const elem of iter) {
        const condition = await fn(elem);
        logger.debug('fn(elem) =', condition);
        logger.debug('elem     =', elem);

        if (condition) {
            return true;
        }
    }
    return false;
}
