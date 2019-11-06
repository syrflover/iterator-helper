import { getLogger } from '../logger.ts';

import { pair, Pair } from '../types/pair.ts';

import { _foldl } from './foldl.ts';

export const logger = getLogger('iterator/average');

async function _average_impl_fn(iter: AsyncIterable<number>) {
    logger.info('_average_impl_fn()');
    const [count, summed] = await _foldl(([current, value]: Pair<number, number>, e: number) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function _average(iter: AsyncIterable<number>) {
    logger.info('_average()');
    return _average_impl_fn(iter);
}
