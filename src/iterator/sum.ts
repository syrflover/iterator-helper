import { getLogger } from '../logger';

import { _fold } from './fold';

const logger = getLogger('iterator/sum');

export function _sum(iter: AsyncIterable<number>, init: number = 0) {
    logger.trace('_sum()');
    return _fold(iter, init, (acc, e) => acc + e);
}
