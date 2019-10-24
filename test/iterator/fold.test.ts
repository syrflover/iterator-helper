import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test fold', () => {
    it('sum', async () => {
        const a = new Iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.fold(Promise.resolve(1), (acc, e) => acc + e);
        const expected = 16;

        assert.strictEqual(actual, expected);
    });
});