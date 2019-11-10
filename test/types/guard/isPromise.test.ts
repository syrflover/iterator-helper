import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isPromise } from '../../../deno/types/guard/mod.ts';

test('isPromise() true', () => {
    const actual = isPromise(Promise.resolve());
    const expected = true;

    assertEquals(actual, expected);
});

test('isPromise() undefined', () => {
    const actual = isPromise(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
