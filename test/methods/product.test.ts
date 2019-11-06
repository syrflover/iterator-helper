import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('product() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.product();
    const expected = 120;

    assertEquals(actual, expected);
});

test('product() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.product();
    const expected = 1;

    assertEquals(actual, expected);
});
