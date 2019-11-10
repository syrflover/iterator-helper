import { getLogger } from '../logger.ts';

import { nubBy } from './nubBy.ts';

const logger = getLogger('methods/nub');

export function nub<T>(iter: AsyncIterable<T>) {
    logger.trace('nub()');
    return nubBy<T>((a, b) => a === b, iter);
}
