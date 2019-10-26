import { assert } from 'chai';

import { maxBy, cmp } from '../../../../src/lib/cmp';

describe('test maxBy', () => {
    it('maxBy(100, 1, cmp) == 100', async () => {
        const actual = await maxBy(100, 1, cmp);
        const expected = 100;

        assert.deepStrictEqual(actual, expected);
    });

    it('maxBy(1, 100, cmp) == 100', async () => {
        const actual = await maxBy(100, 1, cmp);
        const expected = 100;

        assert.deepStrictEqual(actual, expected);
    });
});
