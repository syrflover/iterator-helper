import { test } from 'https://deno.land/std/testing/mod.ts';
import { assert, assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('foldr1() sum', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.foldr1((e, acc) => acc + e);
    const expected = 15;

    assertEquals(actual, expected);
});

test(`foldr1() empty iter`, async () => {
    const a = iterator<number>([]);

    try {
        await a.foldr1((e, acc) => acc + e);
    } catch (error) {
        assert(/least one element is required in iterator/i.test(error.message));
    }
});
