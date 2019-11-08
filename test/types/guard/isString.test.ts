import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isString } from '../../../mod.ts';

test('isString() string', () => {
    const actual = isString('hello');
    const expected = true;

    assertEquals(actual, expected);
});

test('isString() array', () => {
    const actual = isString(['hello', 'world']);
    const expected = false;

    assertEquals(actual, expected);
});

test('isString() undefined', () => {
    const actual = isString(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
