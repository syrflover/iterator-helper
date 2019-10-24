import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test collect', () => {
    it('[1,2,3,4,5]', async () => {
        const a = new Iterator([1, 2, 3, 4, 5]);

        const actual = await a.collect();
        const expected = [1, 2, 3, 4, 5];

        assert.deepStrictEqual(actual, expected);
    });
});
