import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('nth() [1,2,3,4,5].nth(0) == 1', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.nth(0);
    const expected = 1;

    assertEquals(actual, expected);
});

Deno.test('nth() [1,2,3,4,5].nth(2) == 3', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.nth(2);
    const expected = 3;

    assertEquals(actual, expected);
});

Deno.test('nth() [1,2,3,4,5].nth(4) == 5', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.nth(4);
    const expected = 5;

    assertEquals(actual, expected);
});

Deno.test('nth() [1,2,3,4,5].nth(5) == undefined', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.nth(5);
    const expected = undefined;

    assertEquals(actual, expected);
});
