import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isArrayLike } from './mod.ts';

Deno.test('isArrayLike() array', () => {
    const actual = isArrayLike([1, 2, 3]);
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isArrayLike() typed array', () => {
    const actual = isArrayLike(new Int8Array(0));
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isArrayLike() undefined', () => {
    const actual = isArrayLike(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
