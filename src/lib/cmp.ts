import { CompareFn } from '../types/fn/cmp';
import { ByKeyFn } from '../types/fn/byKey';

import { Ord } from '../types/ordering';

import { id } from './id';

export function cmp<T>(a: T, b: T): Ord {
    if (a < b) {
        return Ord.Less;
    }

    if (a > b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}

export async function maxBy<T, K>(keyFn: ByKeyFn<T, K>, cmpFn: CompareFn<K>, a: T, b: T): Promise<T> {
    const key_a = await keyFn(a);
    const key_b = await keyFn(b);
    const ord = await cmpFn(key_a, key_b);

    switch (ord) {
        case Ord.Less:
            return b;

        case Ord.Greater:
            return a;

        case Ord.Equal:
            return b;
    }
}

export async function minBy<T, K>(keyFn: ByKeyFn<T, K>, cmpFn: CompareFn<K>, a: T, b: T): Promise<T> {
    const key_a = await keyFn(a);
    const key_b = await keyFn(b);
    const ord = await cmpFn(key_a, key_b);

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
    return maxBy(id, cmp, a, b);
}

export function min<T>(a: T, b: T): Promise<T> {
    return minBy(id, cmp, a, b);
}
