

import { fold } from './fold';



export function sum(iter: AsyncIterable<number>): Promise<number> {
    
    return fold((acc, e) => acc + e, 0, iter);
}
