import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/product');

export function _product(iter: AsyncIterable<number>) {
    logger.trace('_product()');
    return _foldl((acc, e) => acc * e, 1, iter);
}
