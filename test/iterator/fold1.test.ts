import { assert } from 'chai';

import { IteratorHelper } from '../../src';

describe('test fold1', () => {
    it('sum', async () => {
        const a = new IteratorHelper([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.fold1((acc, e) => acc + e);
        const expected = 15;

        assert.strictEqual(actual, expected);
    });
});
