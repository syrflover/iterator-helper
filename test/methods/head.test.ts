import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('head() [1,2,3,4,5]', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.head();
    const expected = 1;

    assertEquals(actual, expected);
});

test(`head() empty iter`, async () => {
    const a = iterator<number>([]);

    const actual = await a.head();

    const expected = undefined;

    assertEquals(actual, expected);
});
