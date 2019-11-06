import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('scanr() state + elem', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [5, 4, 3, 2, 1];

    const actual_result: number[] = [];
    const expected_result = [16, 15, 13, 10, 6, 1];

    for await (const _ of a.scanr(Promise.resolve(1), (e, st) => {
        actual_elements.push(e);
        return st + e;
    })) {
        actual_result.push(_);
    }

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_result, expected_result);
});

test('scanr() `${state}${elem}`', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [5, 4, 3, 2, 1];

    const actual_result: string[] = [];
    const expected_result = ['154321', '15432', '1543', '154', '15', '1'];

    for await (const _ of a.scanr('1', (e, st) => {
        actual_elements.push(e);
        return `${st}${e}`;
    })) {
        actual_result.push(_);
    }

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_result, expected_result);
});
