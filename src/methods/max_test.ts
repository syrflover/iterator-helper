import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('max() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.max();
    const expected = 5;

    assertEquals(actual, expected);
});

test('max() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.max();
    const expected = undefined;

    assertEquals(actual, expected);
});