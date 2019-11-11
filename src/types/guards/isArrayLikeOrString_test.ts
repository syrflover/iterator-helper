import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isArrayLikeOrString } from '../../../deno/types/guards/mod.ts';

test('isArrayLikeOrString() array', () => {
    const actual = isArrayLikeOrString([1, 2, 3]);
    const expected = true;

    assertEquals(actual, expected);
});

test('isArrayLikeOrString() typed array', () => {
    const actual = isArrayLikeOrString(new Int8Array([1, 2, 3]));
    const expected = true;

    assertEquals(actual, expected);
});

test('isArrayLikeOrString() string', () => {
    const actual = isArrayLikeOrString('abcd');
    const expected = true;

    assertEquals(actual, expected);
});

test('isArrayLikeOrString() undefined', () => {
    const actual = isArrayLikeOrString(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
