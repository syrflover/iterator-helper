import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import type { Pair } from '../types/mod.ts';
import { iterator } from '../mod.ts';

Deno.test('all() x > 0', async () => {
    const a = iterator([1, 2, 3]);

    const actual: Pair<boolean, number[]> = [await a.all((e) => e > 0), []];
    const expected: Pair<boolean, number[]> = [true, []];

    for await (const _ of a) {
        actual[1].push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('all() x > 2', async () => {
    const a = iterator([1, 2, 3]);

    const actual: Pair<boolean, number[]> = [await a.all((e) => e > 2), []];
    const expected: Pair<boolean, number[]> = [false, [2, 3]];

    for await (const _ of a) {
        actual[1].push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('all() empty iter', async () => {
    const a = iterator<number>([]);

    const actual: Pair<boolean, number[]> = [await a.all((e) => e > 3), []];
    const expected: Pair<boolean, number[]> = [true, []];

    for await (const _ of a) {
        actual[1].push(_);
    }

    assertEquals(actual, expected);
});
