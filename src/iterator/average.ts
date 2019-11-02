import { getLogger } from '../logger';

import { pair } from '../types/pair';

import { _foldl } from './foldl';

export const logger = getLogger('iterator/average');

async function _average_impl_fn(iter: AsyncIterable<number>) {
    logger.trace('_average_impl_fn()');
    const [count, summed] = await _foldl(([current, value], e) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function _average(iter: AsyncIterable<number>) {
    logger.trace('_average()');
    return _average_impl_fn(iter);
}
