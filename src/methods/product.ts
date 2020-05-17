import { getLogger } from '../logger.ts';

import { fold } from './fold.ts';

const logger = await getLogger('methods/product');

export function product(iter: AsyncIterable<number>): Promise<number> {
    logger.trace('product()');
    return fold((acc, e) => acc * e, 1, iter);
}
