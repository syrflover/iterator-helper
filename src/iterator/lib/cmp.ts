import { CompareFn } from '../../types/fn/cmp';
import { Ord } from '../../types/ordering';

export function cmp<T>(a: T, b: T): Ord {
    if (a < b) {
        return Ord.Less;
    }

    if (a > b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}

export async function maxBy<T>(a: T, b: T, fn: CompareFn<T>): Promise<T> {
    const ord = await fn(a, b);

    switch (ord) {
        case Ord.Less:
            return b;

        case Ord.Greater:
            return a;

        case Ord.Equal:
            return b;
    }
}

export async function minBy<T>(a: T, b: T, fn: CompareFn<T>): Promise<T> {
    const ord = await fn(a, b);

    switch (ord) {
        case Ord.Less:
            return a;

        case Ord.Greater:
            return b;

        case Ord.Equal:
            return b;
    }
}

export function max<T>(a: T, b: T): Promise<T> {
    return maxBy(a, b, cmp);
}

export function min<T>(a: T, b: T): Promise<T> {
    return minBy(a, b, cmp);
}
