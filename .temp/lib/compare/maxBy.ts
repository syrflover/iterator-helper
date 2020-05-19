import { CompareFn, KeyFn } from '../../types/functions/mod';

import { Ord } from '../../types/mod';

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
}
