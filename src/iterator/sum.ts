import { getLogger } from '../logger';

import { _foldl } from './foldl';

const logger = getLogger('iterator/sum');

export function _sum(iter: AsyncIterable<number>) {
    logger.trace('_sum()');
    return _foldl((acc, e) => acc + e, 0, iter);
}
