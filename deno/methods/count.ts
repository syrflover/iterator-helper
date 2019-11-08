

import { _foldl } from './foldl.ts';



// [a] -> Int
export function _count<T>(iter: AsyncIterable<T>) {
    
    return _foldl((count: number) => count + 1, 0, iter);
    // return _count_impl_fn(iter);
}
