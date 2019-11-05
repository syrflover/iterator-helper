import { assert } from 'chai';

import { minBy, cmp } from '../../../src/lib/cmp';

describe('test minBy', () => {
    it('minBy(100, 1, cmp) == 1', async () => {
        const actual = await minBy(100, 1, cmp);
        const expected = 1;

        assert.deepStrictEqual(actual, expected);
    });

    it('minBy(1, 100, cmp) == 1', async () => {
        const actual = await minBy(100, 1, cmp);
        const expected = 1;

        assert.deepStrictEqual(actual, expected);
    });
});
