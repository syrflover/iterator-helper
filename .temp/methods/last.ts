

import { fold } from './fold';



// [a] -> Maybe a
export function last<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    
    return fold((_, e) => e, undefined as T | undefined, iter);
}
