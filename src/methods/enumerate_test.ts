import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { pair, Pair } from '../types/mod.ts';
import { iterator } from '../mod.ts';

Deno.test(`enumerate(['a', 'b', 'c', 'd', 'e'])`, async () => {
    const a = iterator(['a', 'b', 'c', 'd', 'e']);

    const actual: Pair<number, string>[] = [];
    const expected = [pair(0, 'a'), pair(1, 'b'), pair(2, 'c'), pair(3, 'd'), pair(4, 'e')];

    for await (const _ of a.enumerate()) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
