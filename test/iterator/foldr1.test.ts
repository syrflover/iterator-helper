import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test foldr1', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.foldr1((e, acc) => acc + e);
        const expected = 15;

        assert.strictEqual(actual, expected);
    });

    it(`empty iter`, async () => {
        const a = iterator<number>([]);

        try {
            await a.foldr1((e, acc) => acc + e);
        } catch (error) {
            assert.ok(/least one element is required in iterator/i.test(error.message));
        }
    });
});
