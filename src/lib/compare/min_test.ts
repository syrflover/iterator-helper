import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { min } from '../../../deno/lib/compare/mod.ts';

test('min(100, 1, compare) == 1', async () => {
    const actual = await min(100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

test('min(1, 100, compare) == 1', async () => {
    const actual = await min(100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
