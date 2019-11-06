import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/sum');

export function _sum(iter: AsyncIterable<number>) {
    logger.trace('_sum()');
    return _foldl((acc, e) => acc + e, 0, iter);
}
