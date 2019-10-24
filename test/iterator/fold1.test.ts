import { assert } from 'chai';

import { iterator } from '../../src';

describe('test fold1', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.fold1((acc, e) => acc + e);
        const expected = 15;

        assert.strictEqual(actual, expected);
    });

    it(`throw new Error('Least One Element is Required in Iterator')`, async () => {
        const a = iterator<number>([]);

        try {
            await a.fold1((acc, e) => acc + e);
        } catch (error) {
            assert.strictEqual(error.message, 'Least One Element is Required in Iterator');
        }
    });
});