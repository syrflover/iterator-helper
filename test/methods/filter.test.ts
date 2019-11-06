import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('filter() is even', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6]);

    const actual: number[] = [];
    const expected = [2, 4, 6];

    for await (const _ of a.filter((e) => e % 2 === 0)) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
