import { id } from '../utils/mod.ts';

import { compare } from './compare.ts';
import { maxBy } from './maxBy.ts';

export function max<T>(a: T, b: T): Promise<T> {
    return maxBy(id, compare, a, b);
}
