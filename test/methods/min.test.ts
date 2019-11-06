import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('min() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.min();
    const expected = 1;

    assertEquals(actual, expected);
});

test('min() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.min();
    const expected = undefined;

    assertEquals(actual, expected);
});
