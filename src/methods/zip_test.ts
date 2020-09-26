import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import type { Pair } from '../types/mod.ts';
import { iterator } from '../mod.ts';

Deno.test('zip() [1,2,3,4].zip([5,6,7,8])', async () => {
    const a = iterator([1, 2, 3, 4]);

    const actual: Pair<number, number>[] = [];
    const expected: Pair<number, number>[] = [
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 8],
    ];

    const it = a.zip([5, 6, 7, 8]);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test(`zip() [1,2,3,4].zip(['a','b','c','d','e'])`, async () => {
    const a = iterator([1, 2, 3, 4]);

    const actual: Pair<number, string>[] = [];
    const expected: Pair<number, string>[] = [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
        [4, 'd'],
    ];

    const it = a.zip(['a', 'b', 'c', 'd', 'e']);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('zip() string', async () => {
    const a = iterator([1, 2, 3, 4]);

    const actual: Pair<number, string>[] = [];
    const expected: Pair<number, string>[] = [
        [1, 'h'],
        [2, 'e'],
        [3, 'l'],
        [4, 'l'],
    ];

    const it = a.zip('hello world');

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('zip() [1,2,3,4].zip([5,Promise(6),7,8])', async () => {
    const a = iterator([1, 2, 3, 4]);

    const actual: Pair<number, number>[] = [];
    const expected: Pair<number, number>[] = [
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 8],
    ];

    const it = a.zip([5, Promise.resolve(6), 7, 8]);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

Deno.test('zip() empty iter', async () => {
    const a = iterator<number>([]);

    const actual: Pair<number, number>[] = [];
    const expected: Pair<number, number>[] = [];

    const it = a.zip([5, 6, 7, 8, 9]);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
