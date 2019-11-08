

import { _foldl } from './foldl.ts';



export function _collect<T>(iter: AsyncIterable<T>) {
    
    return _foldl((acc: T[], e: T) => [...acc, e], [] as T[], iter);
    // return _collect_impl_fn(iter);
}
