import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('count() [1,2,3,4,5].length === count()', async () => {
    const a = [1, 2, 3, 4, 5];

    const actual = await iterator([1, 2, 3, 4, 5]).count();
    const expected = a.length;

    assertEquals(actual, expected);
});
