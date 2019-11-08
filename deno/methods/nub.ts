

import { _nubBy } from './nubBy.ts';



export function _nub<T>(iter: AsyncIterable<T>) {
    
    return _nubBy((a: T, b: T) => a === b, iter);
}
