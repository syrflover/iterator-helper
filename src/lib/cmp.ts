import { CompareFn } from '../types/fn/cmp.ts';
import { KeyFn } from '../types/fn/key.ts';

import { Ord } from '../types/ordering.ts';

import { id } from './id.ts';

export function cmp<T>(a: T, b: T): Ord {
    if (a < b) {
        return Ord.Less;
    }

    if (a > b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}

export async function maxBy<T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, a: T, b: T): Promise<T> {
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

    // semantic error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
    throw new Error('');
}

export async function minBy<T, K>(keyFn: KeyFn<T, K>, cmpFn: CompareFn<K>, a: T, b: T): Promise<T> {
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

    // semantic error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
    throw new Error('');
}

export function max<T>(a: T, b: T): Promise<T> {
    return maxBy(id, cmp, a, b);
}

export function min<T>(a: T, b: T): Promise<T> {
    return minBy(id, cmp, a, b);
}
