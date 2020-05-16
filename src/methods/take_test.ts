import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('take(4)', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const it = a.take(4);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('take(Infinity)', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

    const actual: number[] = [];
    const expected = [1, 2, 3, 4, 5, 6, 7, 8];

    const it = a.take(Infinity);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
