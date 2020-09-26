import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import type { Pair } from '../types/mod.ts';
import { iterator } from '../mod.ts';

Deno.test('unzip() [[1, 5], [2, 6], [3, 7], [4, 8]]', async () => {
    const a = iterator<Pair<number, number>>([
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 8],
    ]);

    const actual_left: number[] = [];
    const expected_left = [1, 2, 3, 4];

    const actual_right: number[] = [];
    const expected_right = [5, 6, 7, 8];

    const [left, right] = await a.unzip();

    for await (const _ of left) {
        actual_left.push(_);
    }

    for await (const _ of right) {
        actual_right.push(_);
    }

    assertEquals(actual_left, expected_left);
    assertEquals(actual_right, expected_right);
});

Deno.test(`unzip() [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]`, async () => {
    const a = iterator<Pair<number, string>>([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
        [4, 'd'],
    ]);

    const actual_left: number[] = [];
    const expected_left = [1, 2, 3, 4];

    const actual_right: string[] = [];
    const expected_right = ['a', 'b', 'c', 'd'];

    const [left, right] = await a.unzip();

    for await (const _ of left) {
        actual_left.push(_);
    }

    for await (const _ of right) {
        actual_right.push(_);
    }

    assertEquals(actual_left, expected_left);
    assertEquals(actual_right, expected_right);
});

Deno.test(`unzip() [1,2,3,4].zip(['a','b','c','d'])`, async () => {
    const a = iterator([1, 2, 3, 4]);

    const actual_left: number[] = [];
    const expected_left = [1, 2, 3, 4];

    const actual_right: string[] = [];
    const expected_right = ['a', 'b', 'c', 'd'];

    const [left, right] = await a.zip(['a', 'b', 'c', 'd']).unzip();

    for await (const _ of left) {
        actual_left.push(_);
    }

    for await (const _ of right) {
        actual_right.push(_);
    }

    assertEquals(actual_left, expected_left);
    assertEquals(actual_right, expected_right);
});
