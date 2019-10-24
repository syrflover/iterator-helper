import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test prototype.iter()', () => {
    it('BigInt64Array', async () => {
        const a = new BigInt64Array(5);
        a[0] = BigInt(-2);
        a[1] = BigInt(-1);
        a[2] = BigInt(0);
        a[3] = BigInt(1);
        a[4] = BigInt(2);

        const actual: bigint[] = [];
        const expected = [BigInt(-2), BigInt(-1), BigInt(0), BigInt(1), BigInt(2)];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
