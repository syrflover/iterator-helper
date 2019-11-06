import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { Ord } from '../../../src/types/ordering.ts';

import { cmp } from '../../../src/lib/cmp.ts';

test('cmp(100, 1) == Greater', () => {
    const actual = cmp(100, 1);
    const expected = Ord.Greater;

    assertEquals(actual, expected);
});

test('cmp(1, 1) == Equal', () => {
    const actual = cmp(1, 1);
    const expected = Ord.Equal;

    assertEquals(actual, expected);
});

test('cmp(1, 100) == Less', () => {
    const actual = cmp(1, 100);
    const expected = Ord.Less;

    assertEquals(actual, expected);
});

test('cmp() Array.sort(cmp)', () => {
    const a = [1, 4, 11, 5, 2, 3];

    const actual = a.sort(cmp);
    const expected = [1, 2, 3, 4, 5, 11];

    assertEquals(actual, expected);
});
