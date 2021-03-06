import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { prepend } from './mod.ts';

Deno.test('prepend(0, [1])', async () => {
    const actual: number[] = [];
    const expected = [0, 1];

    for await (const _ of prepend(0, [1])) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
