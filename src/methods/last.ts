import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = getLogger('methods/last');

// [a] -> Maybe a
export function last<T>(iter: AsyncIterable<T>) {
    logger.trace('last()');
    return fold((_, e) => e, undefined as T | undefined, iter);
}
