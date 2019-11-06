import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { minBy, cmp } from '../../../src/lib/cmp.ts';
import { id } from '../../../src/lib/id.ts';

test('minBy(100, 1, cmp) == 1', async () => {
    const actual = await minBy(id, cmp, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minBy(1, 100, cmp) == 1', async () => {
    const actual = await minBy(id, cmp, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
