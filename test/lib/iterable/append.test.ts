import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { append } from '../../../src/lib/iterable/append.ts';

test('append(1, [0])', async () => {
    const actual: number[] = [];
    const expected = [0, 1];

    for await (const _ of append(1, [0])) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
