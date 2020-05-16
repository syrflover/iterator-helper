import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { Ord } from '../../types/mod.ts';
import { compare } from './mod.ts';

Deno.test('compare(100, 1) == Greater', () => {
    const actual = compare(100, 1);
    const expected = Ord.Greater;

    assertEquals(actual, expected);
});

Deno.test('compare(1, 1) == Equal', () => {
    const actual = compare(1, 1);
    const expected = Ord.Equal;

    assertEquals(actual, expected);
});

Deno.test('compare(1, 100) == Less', () => {
    const actual = compare(1, 100);
    const expected = Ord.Less;

    assertEquals(actual, expected);
});

Deno.test('compare() Array.sort(compare)', () => {
    const a = [1, 4, 11, 5, 2, 3];

    const actual = a.sort(compare);
    const expected = [1, 2, 3, 4, 5, 11];

    assertEquals(actual, expected);
});
