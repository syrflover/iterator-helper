

import { compare } from '../lib/compare/mod.ts';

import { maxBy } from './maxBy.ts';



export function max<T>(iter: AsyncIterable<T>): Promise<T | undefined> {
    
    return maxBy(compare, iter);
}
