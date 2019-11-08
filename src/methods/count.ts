import { getLogger } from '../logger.ts';

import { _foldl } from './foldl.ts';

const logger = getLogger('iterator/count');

// [a] -> Int
export function _count<T>(iter: AsyncIterable<T>) {
    logger.trace('_count()');
    return _foldl((count: number) => count + 1, 0, iter);
    // return _count_impl_fn(iter);
}
