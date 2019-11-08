

import { _foldl } from './foldl.ts';



export function _product(iter: AsyncIterable<number>) {
    
    return _foldl((acc, e) => acc * e, 1, iter);
}
