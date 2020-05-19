import { id } from '../utils/mod';

import { compare } from './compare';
import { minBy } from './minBy';

export function min<T>(a: T, b: T): Promise<T> {
    return minBy(id, compare, a, b);
}
