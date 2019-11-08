import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { curry } from '../../mod.ts';

test('curry() add a b', () => {
    const add = (a: number, b: number) => a + b;

    const curried = curry(add);

    const add_2 = curried(2);

    assertEquals(add_2(5), 7);
});

test('curry() add a b c d', () => {
    const add = (a: number, b: number, c: number, d: number) => a + b + c + d;

    const curried = curry(add);

    const add_2 = curried(2);
    const add_2_3 = add_2(3);

    assertEquals(add_2(3)(4)(5), 14);
    assertEquals(add_2(3)(4, 5), 14);
    assertEquals(add_2(3, 4)(5), 14);
    assertEquals(add_2(3, 4, 5), 14);
    assertEquals(add_2_3(4, 5), 14);
    assertEquals(add_2_3(4)(5), 14);
});
