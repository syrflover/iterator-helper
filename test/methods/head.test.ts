
import { assert } from 'chai';

import { iterator } from '../../src';

describe('test head', () => {
    it('[1,2,3,4,5]', async () => {
        const a = iterator([1, 2, 3, Promise.resolve(4), 5]);

        const actual = await a.head();
        const expected = 1;

        assert.strictEqual(actual, expected);
    });

    it(`empty iter`, async () => {
        const a = iterator<number>([]);

        const actual = await a.head();

        const expected = undefined;

        assert.strictEqual(actual, expected);
    });
});
