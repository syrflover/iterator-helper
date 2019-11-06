import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('findMap() parseInt Succeeded', async () => {
    const a = iterator(['a', 'b', '1', 'c', '2', '3']);

    const actual = await a.findMap((e) => parseInt(e, 10));
    const expected = 1;

    assertEquals(actual, expected);
});

test('findMap() parseInt Failed', async () => {
    const a = iterator(['a', 'b', 'c', 'd', 'e']);

    const actual = await a.findMap((e) => parseInt(e, 10));
    const expected = undefined;

    assertEquals(actual, expected);
});
