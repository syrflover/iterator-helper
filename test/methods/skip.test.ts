import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('skip(4)', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

    const actual: number[] = [];
    const expected = [5, 6, 7, 8];

    const it = a.skip(4);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('skip(Infinity)', async () => {
    const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

    const actual: number[] = [];
    const expected: number[] = [];

    const it = a.skip(Infinity);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
