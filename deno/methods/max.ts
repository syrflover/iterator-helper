

import { cmp } from '../lib/cmp.ts';

import { _maxBy } from './maxBy.ts';



export function _max<T>(iter: AsyncIterable<T>) {
    
    return _maxBy(cmp, iter);
}
