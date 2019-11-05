import { assert } from 'chai';

import { iterator } from '../../dist';

describe('test position', () => {
    it('[1,2,3,4,5].position() matched', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.position((e) => e === 3);
        const expected = 2;

        assert.strictEqual(actual, expected);
    });

    it('[1,2,3,4,5].position() not matched', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.position((e) => e === 100);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.position((e) => e === 3);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
