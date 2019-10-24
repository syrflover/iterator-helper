import { getLogger } from '../logger';

import { _fold } from './fold';

const logger = getLogger('iterator/product');

export function _product(iter: AsyncIterable<number>, init: number = 1) {
    logger.trace('_product()');
    return _fold(iter, init, (acc, e) => acc * e);
}
