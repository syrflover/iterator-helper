
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test average', () => {
    it('average', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.average();
        const expected = 3;

        assert.strictEqual(actual, expected);
    });

    it('empty iter', async () => {
        const a = iterator<number>([]);

        const actual = await a.average();
        const expected = 0;

        assert.strictEqual(actual, expected);
    });
});
