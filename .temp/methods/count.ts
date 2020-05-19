

import { fold } from './fold';



// [a] -> Int
export function count<T>(iter: AsyncIterable<T>): Promise<number> {
    
    return fold((count_: number) => count_ + 1, 0, iter);
}
