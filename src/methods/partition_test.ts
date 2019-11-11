import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('partition() even', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_left: number[] = [];
    const expected_left = [2, 4];

    const actual_right: number[] = [];
    const expected_right = [1, 3, 5];

    const [left, right] = await a.partition((e) => e % 2 === 0);

    for await (const _ of left) {
        actual_left.push(_);
    }

    for await (const _ of right) {
        actual_right.push(_);
    }

    assertEquals(actual_left, expected_left);
    assertEquals(actual_right, expected_right);
});
