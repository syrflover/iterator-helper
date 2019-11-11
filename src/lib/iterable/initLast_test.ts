/* eslint
no-empty-function: "off"
*/
import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { initLast } from '../../../deno/lib/iterable/mod.ts';

async function* asyncIterable(): AsyncIterable<number> {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

async function* emptyAsyncIterable() {}

test('initLast() [1, 2, 3, 4]', async () => {
    const [init, last] = await initLast(asyncIterable());

    const actual_init: number[] = [];
    const expected_init = [1, 2, 3];

    const actual_last = last;
    const expected_last = 4;

    for await (const _ of init) {
        actual_init.push(_);
    }

    assertEquals(actual_init, expected_init);
    assertEquals(actual_last, expected_last);
});

test('initLast() empty', async () => {
    const [init, last] = await initLast(emptyAsyncIterable());

    const actual_init: number[] = [];
    const expected_init: number[] = [];

    const actual_last = last;
    const expected_last = undefined;

    for await (const _ of init) {
        actual_init.push(_);
    }

    assertEquals(actual_init, expected_init);
    assertEquals(actual_last, expected_last);
});
