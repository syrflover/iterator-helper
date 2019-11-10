import { Ord } from '../../types/ordering.ts';

export function compare<T>(a: T, b: T): Ord {
    if (a < b) {
        return Ord.Less;
    }

    if (a > b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}
