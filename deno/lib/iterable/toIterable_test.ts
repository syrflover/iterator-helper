import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals, assert } from 'https://deno.land/std/testing/asserts.ts';

import { toIterable } from '../../../deno/lib/iterable/mod.ts';

function* iterable(): Iterable<number> {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

test('toIterable() from Array', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toIterable([1, 2, 3, 4]);

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.iterator in iter);
});

test('toIterable() from Iterable', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toIterable(iterable());

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.iterator in iter);
});

test('toIterable() from String', async () => {
    const actual: string[] = [];
    const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];

    const iter = toIterable('hello world');

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.iterator in iter);
});
