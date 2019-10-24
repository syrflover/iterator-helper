import { logger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

export async function _find<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>) {
    logger.trace('iterator/find', '_find()');
    for await (const elem of iter) {
        if (await predicate(elem)) {
            return elem;
        }
    }
}
