
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test nth', () => {
    it('[1,2,3,4,5].nth(0) == 1', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(0);
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it('[1,2,3,4,5].nth(2) == 3', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(2);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });

    it('[1,2,3,4,5].nth(4) == 5', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(4);
        const expected = 5;

        assert.strictEqual(actual, expected);
    });

    it('[1,2,3,4,5].nth(5) == undefined', async () => {
        const a = iterator([1, 2, 3, 4, 5]);

        const actual = await a.nth(5);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
