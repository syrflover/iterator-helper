import { getLogger } from '../logger.ts';

import { cmp } from '../lib/cmp.ts';

import { _minBy } from './minBy.ts';

const logger = getLogger('iterator/min');

export function _min<T>(iter: AsyncIterable<T>) {
    logger.trace('_min()');
    return _minBy(cmp, iter);
}
