import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('last() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.last();
    const expected = 5;

    assertEquals(actual, expected);
});

Deno.test(`last() empty iter`, async () => {
    const a = iterator<number>([]);

    const actual = await a.last();

    const expected = undefined;

    assertEquals(actual, expected);
});
