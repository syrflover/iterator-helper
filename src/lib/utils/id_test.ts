import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { id } from './mod.ts';

Deno.test('id()', async () => {
    const actual = id(1);
    const expected = 1;

    assertEquals(actual, expected);
});
