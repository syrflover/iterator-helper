import { test } from 'https://deno.land/std/testing/mod.ts';
import { assert, assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../mod.ts';

test('foldl1() sum', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.foldl1((acc, e) => acc + e);
    const expected = 15;

    assertEquals(actual, expected);
});

test(`foldl1() empty iter')`, async () => {
    const a = iterator<number>([]);

    try {
        await a.foldl1((acc, e) => acc + e);
    } catch (error) {
        assert(/least one element is required in iterator/i.test(error.message));
    }
});
