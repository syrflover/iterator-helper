import { getLogger } from '../logger';

import { _foldl } from './foldl';

const logger = getLogger('iterator/product');

export function _product(iter: AsyncIterable<number>) {
    logger.trace('_product()');
    return _foldl((acc, e) => acc * e, 1, iter);
}
