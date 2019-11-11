import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isArrayLike } from '../../../deno/types/guards/mod.ts';

test('isArrayLike() array', () => {
    const actual = isArrayLike([1, 2, 3]);
    const expected = true;

    assertEquals(actual, expected);
});

test('isArrayLike() typed array', () => {
    const actual = isArrayLike(new Int8Array(0));
    const expected = true;

    assertEquals(actual, expected);
});

test('isArrayLike() undefined', () => {
    const actual = isArrayLike(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
