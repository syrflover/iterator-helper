import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('map() [1,2,3,4,5] -> [2,3,4,5,6]', async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual: number[] = [];
    const expected = [2, 3, 4, 5, 6];

    for await (const _ of a.map((e) => e + 1)) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test(`map() [1,2,3,4,5] -> ['1','2','3','4','5']`, async () => {
    const a = iterator([1, 2, 3, 4, 5]);

    const actual: string[] = [];
    const expected = ['1', '2', '3', '4', '5'];

    for await (const _ of a.map((e) => `${e}`)) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
