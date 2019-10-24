import { logger } from '../logger';

import { _fold } from './fold';

export function _sum(iter: AsyncIterable<number>) {
    logger.trace('iterator/sum', '_sum()');
    return _fold(iter, 0, (acc, e) => acc + e);
}
