import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('find(3) === 3', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.find((e) => e === 3);
    const expected = 3;

    assertEquals(actual, expected);
});

test('find(6) === undefined', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual = await a.find((e) => e === 6);
    const expected = undefined;

    assertEquals(actual, expected);
});
