import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from '../../../deno/lib/utils/mod.ts';
import { compare, minBy } from '../../../deno/lib/compare/mod.ts';

test('minBy(100, 1, compare) == 1', async () => {
    const actual = await minBy(id, compare, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minBy(1, 100, compare) == 1', async () => {
    const actual = await minBy(id, compare, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
