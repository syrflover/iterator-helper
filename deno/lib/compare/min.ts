import { id } from '../utils/mod.ts';

import { compare } from './compare.ts';
import { minBy } from './minBy.ts';

export function min<T>(a: T, b: T): Promise<T> {
    return minBy(id, compare, a, b);
}
