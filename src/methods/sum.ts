import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/sum');

export function sum(iter: AsyncIterable<number>) {
    logger.trace('sum()');
    return foldl((acc, e) => acc + e, 0, iter);
}
