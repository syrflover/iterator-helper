import { assert } from 'chai';

import { Iterator } from '../../src';

describe('test prototype.iter()', () => {
    it('BigUint64Array', async () => {
        const a = new BigUint64Array(5);
        a[0] = BigInt(0);
        a[1] = BigInt(1);
        a[2] = BigInt(2);
        a[3] = BigInt(3);
        a[4] = BigInt(4);

        const actual: bigint[] = [];
        const expected = [BigInt(0), BigInt(1), BigInt(2), BigInt(3), BigInt(4)];

        for await (const _ of a.iter()) {
            actual.push(_);
        }

        assert.deepStrictEqual(actual, expected);
    });
});
