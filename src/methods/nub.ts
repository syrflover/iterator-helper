import { getLogger } from '../logger.ts';

import { _nubBy } from './nubBy.ts';

const logger = getLogger('iterator/nub');

export function _nub<T>(iter: AsyncIterable<T>) {
    logger.trace('_nubBy()');
    return _nubBy((a: T, b: T) => a === b, iter);
}
