import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('stepBy(2)', async () => {
    const a = iterator([0, 1, 2, 3, 4, 5]);

    const actual: number[] = [];
    const expected = [0, 2, 4];

    const it = a.stepBy(2);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('stepBy(Infinity)', async () => {
    const a = iterator([0, 1, 2, 3, 4, 5]);

    const actual: number[] = [];
    const expected = [0];

    const it = a.stepBy(Infinity);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('stepBy() empty iter', async () => {
    const a = iterator<number>([]);

    const actual: number[] = [];
    const expected: number[] = [];

    const it = a.stepBy(2);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
