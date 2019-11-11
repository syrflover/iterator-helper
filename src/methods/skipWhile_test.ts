import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('skipWhile(x < 3, [1,2,3,4,5,1,2,3]) == [3,4,5,1,2,3]', async () => {
    const a = iterator([1, 2, 3, 4, 5, 1, 2, 3]);

    const actual: number[] = [];
    const expected = [3, 4, 5, 1, 2, 3];

    const it = a.skipWhile((e) => e < 3);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('skipWhile(x < 9, [1,2,3]) == []', async () => {
    const a = iterator([1, 2, 3]);

    const actual: number[] = [];
    const expected: number[] = [];

    const it = a.skipWhile((e) => e < 9);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('skipWhile(x < 0, [1,2,3]) == [1,2,3]', async () => {
    const a = iterator([1, 2, 3]);

    const actual: number[] = [];
    const expected: number[] = [1, 2, 3];

    const it = a.skipWhile((e) => e < 0);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
