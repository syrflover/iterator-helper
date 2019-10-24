import { assert } from 'chai';

import { iterator } from '../../src';

describe('test foldl1', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.foldl1((acc, e) => acc + e);
        const expected = 15;

        assert.strictEqual(actual, expected);
    });

    it(`throw new Error('Least one element is required in Iterator')`, async () => {
        const a = iterator<number>([]);

        try {
            await a.foldl1((acc, e) => acc + e);
        } catch (error) {
            assert.ok(/least one element is required in iterator/i.test(error.message));
        }
    });
});
