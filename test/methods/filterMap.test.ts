import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('filterMap() parseInt', async () => {
    const a = iterator(['a', 'b', '1', '2', '3', 'c', '4', 'd']);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    for await (const _ of a.filterMap((e) => parseInt(e, 10))) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
