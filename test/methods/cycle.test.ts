
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test cycle', () => {
    it('[1,2,3,4,5,6,7,8]', async () => {
        const a = iterator([1, 2, 3, 4, 5, 6, 7, 8]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3];

        for await (const _ of a.cycle()) {
            if (actual.length === expected.length) {
                break;
            }

            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
