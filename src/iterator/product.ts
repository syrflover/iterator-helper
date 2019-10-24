import { getLogger } from '../logger';

import { _foldl } from './foldl';

const logger = getLogger('iterator/product');

export function _product(iter: AsyncIterable<number>, init: number = 1) {
    logger.trace('_product()');
    return _foldl(iter, init, (acc, e) => acc * e);
}
