import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('sum()', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.sum();
    const expected = 15;

    assertEquals(actual, expected);
});

Deno.test('sum() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.sum();
    const expected = 0;

    assertEquals(actual, expected);
});
