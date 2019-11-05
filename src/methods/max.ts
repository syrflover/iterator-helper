import { getLogger } from '../logger';

import { cmp } from '../lib/cmp';

import { _maxBy } from './maxBy';

const logger = getLogger('iterator/max');

export function _max<T>(iter: AsyncIterable<T>) {
    logger.trace('_max()');
    return _maxBy(cmp, iter);
}
