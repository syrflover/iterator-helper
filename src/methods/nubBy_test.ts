import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../mod.ts';

Deno.test(`nubBy() ['a', 'bb', 'ccc']`, async () => {
    const a = iterator(['a', 'bb', 'b', 'ccc', 'aa', 'cc', 'aaa']);

    const actual: string[] = [];
    const expected = ['a', 'bb', 'ccc'];

    const it = a.nubBy((e1, e2) => e1.length === e2.length);

    for await (const _ of it) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
