import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test chain', () => {
    it('[1,2,3].chain([4,5,6])', async () => {
        const a = iterator([1, 2, 3]);

        const actual: number[] = [];
        const expected = [1, 2, 3, 4, 5, 6];

        for await (const _ of a.chain([4, 5, 6])) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
