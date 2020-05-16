import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isArrayLikeOrString } from './mod.ts';

Deno.test('isArrayLikeOrString() array', () => {
    const actual = isArrayLikeOrString([1, 2, 3]);
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isArrayLikeOrString() typed array', () => {
    const actual = isArrayLikeOrString(new Int8Array([1, 2, 3]));
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isArrayLikeOrString() string', () => {
    const actual = isArrayLikeOrString('abcd');
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isArrayLikeOrString() undefined', () => {
    const actual = isArrayLikeOrString(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
