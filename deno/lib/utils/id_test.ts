import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from '../../../deno/lib/utils/mod.ts';

test('id()', async () => {
    const actual = id(1);
    const expected = 1;

    assertEquals(actual, expected);
});
