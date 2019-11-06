
import { test } from 'https://deno.land/std/testing/mod.ts';
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { iterator } from '../../src/mod.ts';

test(`flatMap() [\`it's Sunny in\`, '', 'California'] split(' ')`, async () => {
    const a = iterator([`it's Sunny in`, '', 'California']);

    const actual: string[] = [];
    const expected = [`it's`, 'Sunny', 'in', '', 'California'];

    for await (const _ of a.flatMap((e) => e.split(' '))) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});

test('flatMap() [[1,2,3],[4,5,6]] * 2', async () => {
    const a = iterator([[1, 2, 3], [4, 5, 6]]);

    const actual: (number | number[])[] = [];
    const expected = [2, 4, 6, 8, 10, 12];

    for await (const _ of a.flatMap((e) => e.map((ee) => ee * 2))) {
        actual.push(_);
    }

    assertEquals(actual, expected);
});
