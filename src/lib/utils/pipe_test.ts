import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { pipe } from './mod.ts';

Deno.test('pipe()', async () => {
    const fn = pipe(
        (a: number) => a + 1,
        async (a) => a * 3,
        (a) => a / 2,
    );

    const actual = await fn(1);
    const expected = 3;

    assertEquals(actual, expected);
});
