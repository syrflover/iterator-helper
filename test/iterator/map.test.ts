import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test map', () => {
    it('[1,2,3,4,5] -> [2,3,4,5,6]', () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5]);

        const actual = a.map((e) => e + 1);
        const expected = new IteratorHelper([2, 3, 4, 5, 6]);

        assert.deepStrictEqual(actual, expected);
    });

    it(`[1,2,3,4,5] -> ['1','2','3','4','5']`, () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5]);

        const actual = a.map((e) => `${e}`);
        const expected = new IteratorHelper(['1', '2', '3', '4', '5']);

        assert.deepStrictEqual(actual, expected);
    });
});
