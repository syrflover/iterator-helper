import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { maxBy_, cmp, id } from '../../../mod.ts';

test('maxBy_(100, 1, cmp) == 100', async () => {
    const actual = await maxBy_(id, cmp, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

test('maxBy_(1, 100, cmp) == 100', async () => {
    const actual = await maxBy_(id, cmp, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
