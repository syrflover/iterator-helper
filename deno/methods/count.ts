

import { foldl } from './foldl.ts';



// [a] -> Int
export function count<T>(iter: AsyncIterable<T>) {
    
    return foldl((count_: number) => count_ + 1, 0, iter);
}
