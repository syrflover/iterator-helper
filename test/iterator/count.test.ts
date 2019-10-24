import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test count', () => {
    it('[1,2,3,4,5].length === count()', async () => {
        const a = [1, 2, 3, 4, 5];

        const actual = await new Iterator([1, 2, 3, 4, 5]).count();
        const expected = a.length;

        assert.strictEqual(actual, expected);
    });
});
