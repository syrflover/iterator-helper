

import { pair, Pair } from '../types/pair.ts';

import { _foldl } from './foldl.ts';

export 

async function _average_impl_fn(iter: AsyncIterable<number>) {
    const [count, summed] = await _foldl(([current, value]: Pair<number, number>, e: number) => pair(current + 1, value + e), pair(0, 0), iter);
    return count === 0 ? 0 : summed / count;
}

export function _average(iter: AsyncIterable<number>) {
    
    return _average_impl_fn(iter);
}
