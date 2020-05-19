

import { compare } from '../lib/compare/mod';

import { maxBy } from './maxBy';



export function max<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    
    return maxBy(compare, iter);
}
