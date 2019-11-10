

import { nubBy } from './nubBy.ts';



export function nub<T>(iter: AsyncIterable<T>) {
    
    return nubBy<T>((a, b) => a === b, iter);
}
