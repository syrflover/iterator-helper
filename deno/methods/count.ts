

import { fold } from './fold.ts';



// [a] -> Int
export function count<T>(iter: AsyncIterable<T>) {
    
    return fold((count_: number) => count_ + 1, 0, iter);
}
