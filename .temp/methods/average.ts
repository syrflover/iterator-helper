

import { pair, Pair } from '../types/mod';

import { fold } from './fold';

export 

async function _average_impl_fn(iter: AsyncIterable<number>) {
    
    const [count, summed] = await fold(([current, value]: Pair<number, number>, e: number) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function average(iter: AsyncIterable<number>) {
    return _average_impl_fn(iter);
}
