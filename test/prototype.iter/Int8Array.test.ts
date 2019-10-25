import '../../src/types/global';

import { assert } from 'chai';

describe('test prototype.iter()', () => {
    it('Int8Array', async () => {
        const a = new Int8Array(5);
        a[0] = -2;
        a[1] = -1;
        a[2] = 0;
        a[3] = 1;
        a[4] = 2;

        const actual: number[] = [];
        const expected = [-2, -1, 0, 1, 2];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
