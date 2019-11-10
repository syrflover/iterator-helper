import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = getLogger('methods/count');

// [a] -> Int
export function count<T>(iter: AsyncIterable<T>) {
    logger.trace('count()');
    return fold((count_: number) => count_ + 1, 0, iter);
}
