import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test('position() [1,2,3,4,5] matched', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.position((e) => e === 3);
    const expected = 2;

    assertEquals(actual, expected);
});

Deno.test('position() [1,2,3,4,5] not matched', async () => {
    const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

    const actual = await a.position((e) => e === 100);
    const expected = undefined;

    assertEquals(actual, expected);
});

Deno.test('position() empty iter', async () => {
    const a = iterator<number>([]);

    const actual = await a.position((e) => e === 3);
    const expected = undefined;

    assertEquals(actual, expected);
});
