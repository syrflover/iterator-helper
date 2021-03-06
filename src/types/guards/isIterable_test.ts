import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isIterable } from './mod.ts';

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

Deno.test('isIterable() Array == true', () => {
    const actual = isIterable([1, 2, 3, 4]);
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isIterable() Iterable == true', () => {
    const actual = isIterable(iterable());
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isIterable() AsyncIterable == false', () => {
    const actual = isIterable(asyncIterable());
    const expected = false;

    assertEquals(actual, expected);
});

Deno.test('isIterable() undefined == false', () => {
    const actual = isIterable(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
