import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test find', () => {
    it('find(3) === 3', async () => {
        const a = new Iterator([1, 2, 3, 4, 5]);

        const actual = await a.find((e) => e === 3);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });

    it('find(6) === undefined', async () => {
        const a = new Iterator([1, 2, 3, 4, 5]);

        const actual = await a.find((e) => e === 6);
        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
