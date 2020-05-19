

import { compare } from '../lib/compare/mod';

import { minBy } from './minBy';



export function min<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    
    return minBy(compare, iter);
}
