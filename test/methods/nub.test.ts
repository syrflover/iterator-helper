
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test nub', () => {
    it('[1, 2, 3, 4, 5, 6]', async () => {
        const a = iterator([1, 2, 1, 3, 2, 4, 3, 5, 4, 1, 5, 6]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6];

        const it = a.nub();

        for await (const _ of it) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
