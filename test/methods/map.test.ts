
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test map', () => {
    it('[1,2,3,4,5] -> [2,3,4,5,6]', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual: number[] = [];
        const expected = [2, 3, 4, 5, 6];

        for await (const _ of a.map((e) => e + 1)) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });

    it(`[1,2,3,4,5] -> ['1','2','3','4','5']`, async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual: string[] = [];
        const expected = ['1', '2', '3', '4', '5'];

        for await (const _ of a.map((e) => `${e}`)) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
