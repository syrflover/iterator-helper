import type { CompareFn, KeyFn } from '../../types/functions/mod.ts';

import { Ord } from '../../types/mod.ts';

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
}
