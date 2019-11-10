

import { foldl } from './foldl.ts';



export function product(iter: AsyncIterable<number>) {
    
    return foldl((acc, e) => acc * e, 1, iter);
}
