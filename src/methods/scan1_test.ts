import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('scan1() state + elem', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual_elements: number[] = [];
    const expected_elements = [2, 3, 4, 5];

    const actual_result: number[] = [];
    const expected_result = [1, 3, 6, 10, 15];

    for await (const _ of a.scan1((st, e) => {
        actual_elements.push(e);
        return st + e;
    })) {
        actual_result.push(_);
    }

    assertEquals(actual_elements, expected_elements);
    assertEquals(actual_result, expected_result);
});
