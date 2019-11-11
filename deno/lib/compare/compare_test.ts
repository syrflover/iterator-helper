import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { Ord } from '../../../deno/types/mod.ts';
import { compare } from '../../../deno/lib/compare/mod.ts';

test('compare(100, 1) == Greater', () => {
    const actual = compare(100, 1);
    const expected = Ord.Greater;

    assertEquals(actual, expected);
});

test('compare(1, 1) == Equal', () => {
    const actual = compare(1, 1);
    const expected = Ord.Equal;

    assertEquals(actual, expected);
});

test('compare(1, 100) == Less', () => {
    const actual = compare(1, 100);
    const expected = Ord.Less;

    assertEquals(actual, expected);
});

test('compare() Array.sort(compare)', () => {
    const a = [1, 4, 11, 5, 2, 3];

    const actual = a.sort(compare);
    const expected = [1, 2, 3, 4, 5, 11];

    assertEquals(actual, expected);
});
