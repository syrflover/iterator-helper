import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { max } from '../../../deno/lib/compare/mod.ts';

test('max(100, 1, compare) == 100', async () => {
    const actual = await max(100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

test('max(1, 100, compare) == 100', async () => {
    const actual = await max(100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
