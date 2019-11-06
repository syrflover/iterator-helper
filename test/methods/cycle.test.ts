import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('count() [1,2,3,4,5,6,7,8]', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3];

    for await (const _ of a.cycle()) {
        if (actual.length === expected.length) {
            break;
        }

        actual.push(_);
    }

    assertEquals(actual, expected);
});
