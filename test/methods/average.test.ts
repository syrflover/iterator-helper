import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('average()', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.average();
    const expected = 3;

    assertEquals(actual, expected);
});

test('average() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.average();
    const expected = 0;

    assertEquals(actual, expected);
});
