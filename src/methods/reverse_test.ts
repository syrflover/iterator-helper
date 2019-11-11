import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('reverse()', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual: number[] = [];
    const expected = [5, 4, 3, 2, 1];

    for await (const _ of a.reverse()) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
