import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { init } from '../../../deno/lib/iterable/mod.ts';

async function* asyncIterable() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

test('init() [1, 2, 3, 4]', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3];

    for await (const _ of init(asyncIterable())) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
