import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { min } from './mod.ts';

Deno.test('min(100, 1, compare) == 1', async () => {
    const actual = await min(100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

Deno.test('min(1, 100, compare) == 1', async () => {
    const actual = await min(100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
