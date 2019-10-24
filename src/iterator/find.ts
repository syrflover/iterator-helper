import { getLogger } from '../logger';

import { PredicateFn } from '../types/fn/predicate';

const logger = getLogger('iterator/find');

export async function _find<T>(iter: AsyncIterable<T>, predicate: PredicateFn<T>) {
    logger.trace('_find()');
    for await (const elem of iter) {
        if (await predicate(elem)) {
            return elem;
        }
    }
}
