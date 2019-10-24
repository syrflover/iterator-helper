import { getLogger } from '../logger';

import { _fold } from './fold';

const logger = getLogger('iterator/sum');

export function _sum(iter: AsyncIterable<number>) {
    logger.trace('_sum()');
    return _fold(iter, 0, (acc, e) => acc + e);
}
