import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { max } from './mod.ts';

Deno.test('max(100, 1, compare) == 100', async () => {
    const actual = await max(100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

Deno.test('max(1, 100, compare) == 100', async () => {
    const actual = await max(100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
