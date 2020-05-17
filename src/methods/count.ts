import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/count');

// [a] -> Int
export function count<T>(iter: AsyncIterable<T>): Promise<number> {
    logger.trace('count()');
    return fold((count_: number) => count_ + 1, 0, iter);
}
