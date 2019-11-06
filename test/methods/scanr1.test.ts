import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('scanr1() state + elem', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [4, 3, 2, 1];

    const actual_result: number[] = [];
    const expected_result = [15, 14, 12, 9, 5];

    for await (const _ of a.scanr1((e, st) => {
        actual_elements.push(e);
        return st + e;
    })) {
        actual_result.push(_);
    }

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_result, expected_result);
});
