import { getLogger } from '../logger.ts';

import { pair, Pair } from '../types/mod.ts';

import { fold } from './fold.ts';

export const logger = await getLogger('methods/average');

async function _average_impl_fn(iter: AsyncIterable<number>) {
    logger.trace('average()');
    const [count, summed] = await fold(([current, value]: Pair<number, number>, e: number) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function average(iter: AsyncIterable<number>) {
    return _average_impl_fn(iter);
}
