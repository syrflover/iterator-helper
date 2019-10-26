import { assert } from 'chai';

import { iterator } from '../../src';

describe('test find', () => {
    it('[1,2,3,4,5].nth(2) == 3', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(2);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });

    it('[1,2,3,4,5].nth(10) == undefined', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(10);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
