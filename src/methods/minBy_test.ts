import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { Ord } from '../../deno/types/mod.ts';
import { compare } from '../../deno/lib/compare/mod.ts';
import { iterator } from '../../mod.ts';

function _compare<T>(a: T, b: T): Ord {
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

    const actual = await a.minBy(compare);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minBy() custom compare', async () => {
    const i = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await i.minBy(_compare);
    const expected = 5;

    assertEquals(actual, expected);
});

test('minBy() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.minBy(compare);
    const expected = undefined;

    assertEquals(actual, expected);
});