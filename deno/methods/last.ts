

import { _foldl } from './foldl.ts';



// [a] -> Maybe a
export function _last<T>(iter: AsyncIterable<T>) {
    
    return _foldl((_, e) => e, undefined as T | undefined, iter);
}
