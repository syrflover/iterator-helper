import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test('foldl() sum', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [1, 2, 3, 4, 5];

    const actual_accumulator_without_result: number[] = [];
    const expected_accumulator_without_result = [1, 2, 4, 7, 11];

    const actual_result = await a.foldl(Promise.resolve(1), (acc, e) => {
        actual_elements.push(e);
        actual_accumulator_without_result.push(acc);
        return acc + e;
    });
    const expected_result = 16;

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_accumulator_without_result, expected_accumulator_without_result);
    assertEquals(actual_result, expected_result);
});

test('foldl() `${acc}${e}`', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [1, 2, 3, 4, 5];

    const actual_accumulator_without_result: string[] = [];
    const expected_accumulator_without_result = ['1', '11', '112', '1123', '11234'];

    const actual_result = await a.foldl('1', (acc, e) => {
        actual_elements.push(e);
        actual_accumulator_without_result.push(acc);
        return `${acc}${e}`;
    });
    const expected_result = '112345';

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_accumulator_without_result, expected_accumulator_without_result);
    assertEquals(actual_result, expected_result);
});
