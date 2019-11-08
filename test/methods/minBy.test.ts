import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator, cmp, Ord } from '../../mod.ts';

function _cmp<T>(a: T, b: T): Ord {
    if (a > b) {
        return Ord.Less;
    }

    if (a < b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}

test('minBy() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.minBy(cmp);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minBy() custom cmp', async () => {
    const i = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await i.minBy(_cmp);
    const expected = 5;

    assertEquals(actual, expected);
});

test('minBy() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.minBy(cmp);
    const expected = undefined;

    assertEquals(actual, expected);
});
