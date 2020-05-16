import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from '../utils/mod.ts';
import { compare, maxBy } from './mod.ts';

Deno.test('maxBy(100, 1, compare) == 100', async () => {
    const actual = await maxBy(id, compare, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});

Deno.test('maxBy(1, 100, compare) == 100', async () => {
    const actual = await maxBy(id, compare, 100, 1);
    const expected = 100;

    assertEquals(actual, expected);
});
