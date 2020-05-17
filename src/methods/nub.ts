import { getLogger } from '../logger.ts';

import { nubBy } from './nubBy.ts';

const logger = await getLogger('methods/nub');

export function nub<T>(iter: AsyncIterable<T>): AsyncIterable<T> {
    logger.trace('nub()');
    return nubBy<T>((a, b) => a === b, iter);
}
