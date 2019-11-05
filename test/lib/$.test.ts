import { assert } from 'chai';

import { $ } from '../../src/lib/$';

describe('test $', () => {
    it('$', async () => {
        const actual = await $(1, (a) => a + 1, (a) => a * 3, async (a) => a / 2);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });
});
