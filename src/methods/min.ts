import { getLogger } from '../logger';

import { cmp } from '../lib/cmp';

import { _minBy } from './minBy';

const logger = getLogger('iterator/min');

export function _min<T>(iter: AsyncIterable<T>) {
    logger.trace('_min()');
    return _minBy(cmp, iter);
}
