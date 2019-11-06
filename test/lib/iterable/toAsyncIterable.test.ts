import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals, assert } from 'https://deno.land/std/testing/asserts.ts';

import { toAsyncIterable } from '../../../src/lib/iterable.ts';

function* iterable(): Iterable<number> {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

async function* asyncIterable(): AsyncIterable<number> {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

test('toAsyncIterable() from Array', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable([1, 2, 3, 4]);

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from Iterable', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable(iterable());

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from AsyncIterable', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable(asyncIterable());

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from Promise Array', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable(Promise.resolve([1, 2, 3, 4]));

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from Promise Iterable', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable(Promise.resolve(iterable()));

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from Promise AsyncIterable', async () => {
    const actual: number[] = [];
    const expected = [1, 2, 3, 4];

    const iter = toAsyncIterable(Promise.resolve(asyncIterable()));

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});

test('toAsyncIterable() from String', async () => {
    const actual: string[] = [];
    const expected = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];

    const iter = toAsyncIterable('hello world');

    for await (const _ of iter) {
        actual.push(_);
    }

    assertEquals(actual, expected);
    assert(Symbol.asyncIterator in iter);
});
