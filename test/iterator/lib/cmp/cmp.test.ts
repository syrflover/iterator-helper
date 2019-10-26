import { assert } from 'chai';

import { Ord } from '../../../../src/types/ordering';

import { cmp } from '../../../../src/lib/cmp';

describe('test cmp', () => {
    it('cmp(100, 1) == Greater', () => {
        const actual = cmp(100, 1);
        const expected = Ord.Greater;

        assert.deepStrictEqual(actual, expected);
    });

    it('cmp(1, 1) == Equal', () => {
        const actual = cmp(1, 1);
        const expected = Ord.Equal;

        assert.deepStrictEqual(actual, expected);
    });

    it('cmp(1, 100) == Less', () => {
        const actual = cmp(1, 100);
        const expected = Ord.Less;

        assert.deepStrictEqual(actual, expected);
    });

    it('Array.sort(cmp)', () => {
        const a = [1, 4, 5, 2, 3];

        const actual = a.sort(cmp);
        const expected = [1, 2, 3, 4, 5];

        assert.deepStrictEqual(actual, expected);
    });
});
