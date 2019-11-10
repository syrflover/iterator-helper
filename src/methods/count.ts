import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/count');

// [a] -> Int
export function count<T>(iter: AsyncIterable<T>) {
    logger.trace('count()');
    return foldl((count_: number) => count_ + 1, 0, iter);
}
