import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { maxBy, cmp } from '../../../src/lib/cmp.ts';
import { id } from '../../../src/lib/id.ts';

test('maxBy(100, 1, cmp) == 100', async () => {
    const actual = await maxBy(id, cmp, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

test('maxBy(1, 100, cmp) == 100', async () => {
    const actual = await maxBy(id, cmp, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
