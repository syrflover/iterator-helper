import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isNull } from '../../../src/types/guard/isNull.ts';

test('isNull() null', () => {
    const actual = isNull(null);
    const expected = true;

    assertEquals(actual, expected);
});

test('isNull() undefined', () => {
    const actual = isNull(undefined);
    const expected = true;

    assertEquals(actual, expected);
});

test('isNull() NaN', () => {
    const actual = isNull(NaN);
    const expected = true;

    assertEquals(actual, expected);
});

test('isNull() string', () => {
    const actual = isNull('');
    const expected = false;

    assertEquals(actual, expected);
});

test('isNull() number', () => {
    const actual = isNull(0);
    const expected = false;

    assertEquals(actual, expected);
});

test('isNull() array', () => {
    const actual = isNull(['hello', 'world']);
    const expected = false;

    assertEquals(actual, expected);
});

test('isNull() object', () => {
    const actual = isNull({ a: 1 });
    const expected = false;

    assertEquals(actual, expected);
});
