import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test filter', () => {
    it('even', () => {
        const a = new IteratorHelper([1, 2, 3, 4, 5, 6]);

        const actual = a.filter((e) => e % 2 === 0);
        const expected = new IteratorHelper([2, 4, 6]);

        assert.deepStrictEqual(actual, expected);
    });
});
