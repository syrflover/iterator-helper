import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test count', () => {
    it('[1,2,3,4,5].length === count()', () => {
        const a = [1, 2, 3, 4, 5];

        const actual = new IteratorHelper([1, 2, 3, 4, 5]).count();
        const expected = a.length;

        assert.strictEqual(actual, expected);
    });
});
