

import { foldl } from './foldl.ts';



export function sum(iter: AsyncIterable<number>) {
    
    return foldl((acc, e) => acc + e, 0, iter);
}
