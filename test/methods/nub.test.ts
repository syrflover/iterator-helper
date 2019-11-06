import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('nub() [1, 2, 3, 4, 5, 6]', async () => {
    const a = iterator([1, 2, 1, 3, 2, 4, 3, 5, 4, 1, 5, 6]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4, 5, 6];

    const it = a.nub();

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
