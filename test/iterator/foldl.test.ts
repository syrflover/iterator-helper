import { assert } from 'chai';

import { iterator } from '../../src';

describe('test foldl', () => {
    it('sum', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.foldl(Promise.resolve(1), (acc, e) => acc + e);
        const expected = 16;

        assert.strictEqual(actual, expected);
    });
});