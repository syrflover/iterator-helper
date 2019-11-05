import { assert } from 'chai';

import { pipe } from '../../src/lib/pipe';

describe('test pipe', () => {
    it('pipe', async () => {
        const fn = pipe(
            (a: number) => a + 1,
            async (a) => a * 3,
            (a) => a / 2,
        );

        const actual = await fn(1);
        const expected = 3;

        assert.strictEqual(actual, expected);
    });
});
