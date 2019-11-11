import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isAsyncIterable } from '../../../deno/types/guards/mod.ts';

function* iterable() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

async function* asyncIterable() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

test('isAsyncIterable() Array == false', () => {
    const actual = isAsyncIterable([1, 2, 3, 4]);
    const expected = false;

    assertEquals(actual, expected);
});

test('isAsyncIterable() Iterable == false', () => {
    const actual = isAsyncIterable(iterable());
    const expected = false;

    assertEquals(actual, expected);
});

test('isAsyncIterable() AsyncIterable == true', () => {
    const actual = isAsyncIterable(asyncIterable());
    const expected = true;

    assertEquals(actual, expected);
});

test('isAsyncIterable() undefined == false', () => {
    const actual = isAsyncIterable(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
