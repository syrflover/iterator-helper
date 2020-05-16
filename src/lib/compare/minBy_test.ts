import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from '../utils/mod.ts';
import { compare, minBy } from './mod.ts';

Deno.test('minBy(100, 1, compare) == 1', async () => {
    const actual = await minBy(id, compare, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});

Deno.test('minBy(1, 100, compare) == 1', async () => {
    const actual = await minBy(id, compare, 100, 1);
    const expected = 1;

    assertEquals(actual, expected);
});
