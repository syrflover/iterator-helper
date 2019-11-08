

import { _foldl } from './foldl.ts';



export function _sum(iter: AsyncIterable<number>) {
    
    return _foldl((acc, e) => acc + e, 0, iter);
}
