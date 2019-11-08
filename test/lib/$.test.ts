import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { $ } from '../../mod.ts';

test('$()', async () => {
    const actual = await $(1, (a) => a + 1, (a) => a * 3, async (a) => a / 2);
    const expected = 3;

    assertEquals(actual, expected);
});
