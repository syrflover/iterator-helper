import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('chain() [1,2,3].chain([4,5,6])', async () => {
    const a = iterator([1, 2, 3]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4, 5, 6];

    for await (const _ of a.chain([4, 5, 6])) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('chain() [1,2,3].chain([4,Promise(5),6])', async () => {
    const a = iterator([1, 2, 3]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4, 5, 6];

    for await (const _ of a.chain([4, Promise.resolve(5), 6])) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
