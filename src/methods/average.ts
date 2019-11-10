import { getLogger } from '../logger.ts';

import { pair, Pair } from '../types/mod.ts';

import { foldl } from './foldl.ts';

export const logger = getLogger('methods/average');

async function _average_impl_fn(iter: AsyncIterable<number>) {
    logger.trace('average()');
    const [count, summed] = await foldl(([current, value]: Pair<number, number>, e: number) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function average(iter: AsyncIterable<number>) {
    return _average_impl_fn(iter);
}
