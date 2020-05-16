import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { flip } from './mod.ts';

Deno.test('flip() div', () => {
    const actual = flip((a, b) => a / b, 1, 2);
    const expected = 2 / 1;

    assertEquals(actual, expected);
});
