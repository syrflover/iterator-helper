import { Ord } from '../../types/ordering';

export function compare<T>(a: T, b: T): Ord {
    if (a < b) {
        return Ord.Less;
    }

    if (a > b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}
