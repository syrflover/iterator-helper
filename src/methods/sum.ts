import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/sum');

export function sum(iter: AsyncIterable<number>): Promise<number> {
    logger.trace('sum()');
    return fold((acc, e) => acc + e, 0, iter);
}
