import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isPromise } from './mod.ts';

Deno.test('isPromise() true', () => {
    const actual = isPromise(Promise.resolve());
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isPromise() undefined', () => {
    const actual = isPromise(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
