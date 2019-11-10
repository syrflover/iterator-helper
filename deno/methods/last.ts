

import { fold } from './fold.ts';



// [a] -> Maybe a
export function last<T>(iter: AsyncIterable<T>) {
    
    return fold((_, e) => e, undefined as T | undefined, iter);
}
