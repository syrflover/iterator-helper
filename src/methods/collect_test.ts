import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('collect() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.collect();
    const expected = [1, 2, 3, 4, 5];

    assertEquals(actual, expected);
});
