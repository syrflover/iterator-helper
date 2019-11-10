import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from '../../../deno/lib/utils/mod.ts';
import { compare, maxBy } from '../../../deno/lib/compare/mod.ts';

test('maxBy(100, 1, compare) == 100', async () => {
    const actual = await maxBy(id, compare, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

test('maxBy(1, 100, compare) == 100', async () => {
    const actual = await maxBy(id, compare, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
