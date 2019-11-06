import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('forEach() [1,2,3,4,5,6]', async () => {
    const a = [1, 2, 3, 4, 5, 6];

    let actual = 0;
    const expected = a.length;

    const r = await iterator(a).forEach((_) => {
        actual += 1;
    });

    assertEquals(actual, expected);
    assertEquals(r, undefined);
});
