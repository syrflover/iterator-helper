import { assert } from 'chai';

import { AsyncIterator_ } from '../../src';

describe('test prototype.iter()', () => {
    it('Float64Array', async () => {
        const a = new Float64Array(5);
        a[0] = 0.1;
        a[1] = 1.2;
        a[2] = 2.3;
        a[3] = 3.4;
        a[4] = 4.5;

        const actual: number[] = [];
        const expected = [0.1, 1.2, 2.3, 3.4, 4.5];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
