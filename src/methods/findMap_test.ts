import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('findMap() parseInt Succeeded', async () => {
    const a = iterator(['a', 'b', '1', 'c', '2', '3']);

    const actual = await a.findMap((e) => parseInt(e, 10));
    const expected = 1;

    assertEquals(actual, expected);
});

Deno.test('findMap() parseInt Failed', async () => {
    const a = iterator(['a', 'b', 'c', 'd', 'e']);

    const actual = await a.findMap((e) => parseInt(e, 10));
    const expected = undefined;

    assertEquals(actual, expected);
});
