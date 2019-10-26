import { assert } from 'chai';

import { iterator } from '../../src';

describe('test maxByKey', () => {
    it('[1,2,-3,4,5,-10].maxByKey(Math.abs)', async () => {
        const a = iterator([1, 2, -3, Promise.resolve(4), 5, -10]);

        const actual = await a.maxByKey(Math.abs);
        const expected = 10;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.maxByKey((e) => e);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
