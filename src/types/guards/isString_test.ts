import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isString } from './mod.ts';

Deno.test('isString() string', () => {
    const actual = isString('hello');
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isString() array', () => {
    const actual = isString(['hello', 'world']);
    const expected = false;

    assertEquals(actual, expected);
});

Deno.test('isString() undefined', () => {
    const actual = isString(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
