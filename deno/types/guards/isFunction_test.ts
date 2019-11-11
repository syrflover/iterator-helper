import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { isFunction } from '../../../deno/types/guards/mod.ts';

test('isFunction() function', () => {
    function a() {}

    const actual = isFunction(a);
    const expected = true;

    assertEquals(actual, expected);
});

test('isFunction() arrow function', () => {
    const actual = isFunction(() => {});
    const expected = true;

    assertEquals(actual, expected);
});

test('isFunction() generator function', () => {
    function* a() {
        yield 1;
    }

    const actual = isFunction(a);
    const expected = false;

    // because a.constructor is GeneratorFunction

    assertEquals(actual, expected);
});

test('isFunction() async generator function', () => {
    async function* a() {
        yield 1;
    }

    const actual = isFunction(a);
    const expected = false;

    // because a.constructor is AsyncGeneratorFunction

    assertEquals(actual, expected);
});

test('isFunction() undefined', () => {
    const actual = isFunction(undefined);
    const expected = false;

    assertEquals(actual, expected);
});
