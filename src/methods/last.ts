import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/last');

// [a] -> Maybe a
export function last<T>(iter: AsyncIterable<T>) {
    logger.trace('last()');
    return foldl((_, e) => e, undefined as T | undefined, iter);
}
