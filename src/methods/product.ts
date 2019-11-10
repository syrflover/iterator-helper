import { getLogger } from '../logger.ts';

import { foldl } from './foldl.ts';

const logger = getLogger('methods/product');

export function product(iter: AsyncIterable<number>) {
    logger.trace('product()');
    return foldl((acc, e) => acc * e, 1, iter);
}
