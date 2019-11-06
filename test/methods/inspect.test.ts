import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/index.ts';

test('inspect() [1, 2, 3, 4]', async () => {
    const a = iterator([1, 4, 2, 3]);

    const actual: number[] = [];
    const expected = [1, 4, 2, 3];

    const i = a.inspect((e) => {
        actual.push(e);
    });

    for await (const _ of i) {
        (() => {})();
    }

    assertEquals(actual, expected);
});

test('inspect() [1,4,2,3].filter(isEven)', async () => {
    const a = iterator([1, 4, 2, 3]);

    const actual: number[] = [];
    const expected = [4, 2];

    const i = a
        .filter((e) => e % 2 === 0)
        .inspect((e) => {
            actual.push(e);
        });

    for await (const _ of i) {
        (() => {})();
    }

    assertEquals(actual, expected);
});
