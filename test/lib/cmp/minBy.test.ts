import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { minBy_, cmp, id } from '../../../mod.ts';

test('minBy_(100, 1, cmp) == 1', async () => {
    const actual = await minBy_(id, cmp, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

test('minBy_(1, 100, cmp) == 1', async () => {
    const actual = await minBy_(id, cmp, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
