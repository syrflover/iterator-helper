import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator, Ord } from '../../mod.ts';

function _cmp<T>(a: T, b: T): Ord {
    if (a > b) {
        return Ord.Less;
    }

    if (a < b) {
        return Ord.Greater;
    }

    return Ord.Equal;
}

test('minByKey() [1,2,-3,4,5,-10].minByKey(Math.abs)', async () => {
    const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

    const actual = await a.minByKey(Math.abs);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minByKey() object', async () => {
    const a = [{ a: 6, b: 11 }, { a: 4, b: 7 }, { a: 1, b: 5 }, { a: 3, b: 2 }, { a: 11, b: 1 }, { a: 5, b: 4 }, { a: 2, b: 3 }, { a: 7, b: 6 }];

    const actual_a = await iterator(a).minByKey((e) => e.a);
    const expected_a = { a: 1, b: 5 };

    const actual_b = await iterator(a).minByKey((e) => e.b);
    const expected_b = { a: 11, b: 1 };

    assertEquals(actual_a, expected_a);
    assertEquals(actual_b, expected_b);
});

test('minByKey() custom cmp', async () => {
    const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

    const actual = await a.minByKey(Math.abs, _cmp);
    const expected = -10;

    assertEquals(actual, expected);
});

test('minByKey() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.minByKey((e) => e);
    const expected = undefined;

    assertEquals(actual, expected);
});
