import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test collect', () => {
    it('[1,2,3,4,5]', () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5]);

        const actual = a.collect();
        const expected = [1, 2, 3, 4, 5];

        assert.deepStrictEqual(actual, expected);
    });
});
