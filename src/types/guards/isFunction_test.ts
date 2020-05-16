import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isFunction } from './mod.ts';

Deno.test('isFunction() function', () => {
    function a() {}

    const actual = isFunction(a);
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isFunction() arrow function', () => {
    const actual = isFunction(() => {});
    const expected = true;

    assertEquals(actual, expected);
});

Deno.test('isFunction() generator function', () => {
    function* a() {
        yield 1;
    }

    const actual = isFunction(a);
    const expected = false;

    // because a.constructor is GeneratorFunction

    assertEquals(actual, expected);
});

Deno.test('isFunction() async generator function', () => {
    async function* a() {
        yield 1;
    }

    const actual = isFunction(a);
    const expected = false;

    // because a.constructor is AsyncGeneratorFunction

    assertEquals(actual, expected);
});

Deno.test('isFunction() undefined', () => {
    const actual = isFunction(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
