import { getLogger } from '../logger.ts';

import { cmp } from '../lib/cmp.ts';

import { _maxBy } from './maxBy.ts';

const logger = getLogger('iterator/max');

export function _max<T>(iter: AsyncIterable<T>) {
    logger.info('_max()');
    return _maxBy(cmp, iter);
}
