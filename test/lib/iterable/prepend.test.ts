import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { prepend } from '../../../deno/lib/iterable/mod.ts';

test('prepend(0, [1])', async () => {
    const actual: number[] = [];
    const expected = [0, 1];

    for await (const _ of prepend(0, [1])) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
