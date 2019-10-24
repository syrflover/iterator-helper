import { getLogger } from '../logger';

import { _foldl } from './foldl';

const logger = getLogger('iterator/sum');

export function _sum(iter: AsyncIterable<number>, init: number = 0) {
    logger.trace('_sum()');
    return _foldl(iter, init, (acc, e) => acc + e);
}
