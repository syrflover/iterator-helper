import { id } from '../utils/mod';

import { compare } from './compare';
import { maxBy } from './maxBy';

export function max<T>(a: T, b: T): Promise<T> {
    return maxBy(id, compare, a, b);
}
