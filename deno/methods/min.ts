

import { cmp } from '../lib/cmp.ts';

import { _minBy } from './minBy.ts';



export function _min<T>(iter: AsyncIterable<T>) {
    
    return _minBy(cmp, iter);
}
