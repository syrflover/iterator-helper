import { getLogger } from '../logger';

import { _nubBy } from './nubBy';

const logger = getLogger('iterator/nub');

export function _nub<T>(iter: AsyncIterable<T>) {
    logger.trace('_nubBy()');
    return _nubBy((a, b) => a === b, iter);
}
