import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('foldr() sum', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [5, 4, 3, 2, 1];

    const actual_accumulator_without_result: number[] = [];
    const expected_accumulator_without_result = [1, 6, 10, 13, 15];

    const actual_result = await a.foldr(Promise.resolve(1), (e, acc) => {
        actual_elements.push(e);
        actual_accumulator_without_result.push(acc);
        return acc + e;
    });
    const expected_result = 16;

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_accumulator_without_result, expected_accumulator_without_result);
    assertEquals(actual_result, expected_result);
});
