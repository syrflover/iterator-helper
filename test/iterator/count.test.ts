import { assert } from 'chai';

describe('test count', () => {
    it('[1,2,3,4,5].length === count()', () => {
        const a = [1, 2, 3, 4, 5];

        const actual = a.iter().count();
        const expected = a.length;

        assert.strictEqual(actual, expected);
    });
});
