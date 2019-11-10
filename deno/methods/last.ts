

import { foldl } from './foldl.ts';



// [a] -> Maybe a
export function last<T>(iter: AsyncIterable<T>) {
    
    return foldl((_, e) => e, undefined as T | undefined, iter);
}
